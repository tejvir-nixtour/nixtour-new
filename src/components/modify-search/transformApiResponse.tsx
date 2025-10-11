// src/utils/transformApiToUI.ts
import type { ReactNode } from 'react';

/**
 * Minimal UI types
 */
export type UIFare = {
  brandId: string;
  brandName: string;
  price: number;
  fareBasis?: string;
  baggage?: {
    carryOnKg?: number | null;
    checkedKg?: number | null;
    raw?: any;
  };
  meals?: string;
  changePenalty?: number | null; // INR value if present
  cancelPenalty?: number | null; // INR value if present
  paymentTimeLimit?: string | null;
  termsId?: string | null;
  termsRaw?: any;
};

export type UIFlight = {
  id: string;
  flightRefs: string[];
  airlineCode?: string;
  airline?: string;
  flightNumber?: string;
  departure: { airport: string; time: string; terminal?: string };
  arrival: { airport: string; time: string; terminal?: string };
  duration: string;
  direct: boolean;
  lowestFare: number;
  fares: UIFare[];
};

function parsePTDuration(pt?: string) {
  if (!pt) return '';
  const h = (pt.match(/(\d+)H/) || [0, 0])[1];
  const m = (pt.match(/(\d+)M/) || [0, 0])[1];
  return `${h ? `${h}h` : ''}${h && m ? ' ' : ''}${m ? `${m}m` : ''}`.trim();
}
function timeHM(t?: string) {
  if (!t) return '';
  return t.slice(0, 5); // "HH:MM:SS" -> "HH:MM"
}

/**
 * Main transform
 */
export function transformApiToUI(api: any): UIFlight[] {
  if (!api || !api.CatalogProductOfferingsResponse) return [];

  const root = api.CatalogProductOfferingsResponse;
  const refList: any[] = root.ReferenceList || [];

  const flightsMap: Record<string, any> = {};
  const productsMap: Record<string, any> = {};
  const brandsMap: Record<string, any> = {};
  const termsMap: Record<string, any> = {};

  refList.forEach((ref) => {
    const t = ref['@type'];
    if (t === 'ReferenceListFlight') {
      (ref.Flight || []).forEach((f: any) => (flightsMap[f.id] = f));
    } else if (t === 'ReferenceListProduct') {
      (ref.Product || []).forEach((p: any) => (productsMap[p.id] = p));
    } else if (t === 'ReferenceListBrand') {
      (ref.Brand || []).forEach((b: any) => (brandsMap[b.id] = b));
    } else if (t === 'ReferenceListTermsAndConditions') {
      (ref.TermsAndConditions || []).forEach(
        (tcond: any) => (termsMap[tcond.id] = tcond)
      );
    }
  });

  const out: UIFlight[] = [];

  const offerings = root.CatalogProductOfferings?.CatalogProductOffering || [];
  offerings.forEach((offer: any) => {
    (offer.ProductBrandOptions || []).forEach((option: any) => {
      const flightRefs: string[] = option.flightRefs || [];
      const firstFlight = flightsMap[flightRefs[0]] || null;
      const lastFlight =
        flightsMap[flightRefs[flightRefs.length - 1]] || firstFlight;

      const fares: UIFare[] = (option.ProductBrandOffering || []).map(
        (pbo: any) => {
          const brandRef = pbo.Brand?.BrandRef;
          const brand = brandsMap[brandRef];
          const productRef = pbo.Product?.[0]?.productRef;
          const product = productsMap[productRef];
          const bPrice = pbo.BestCombinablePrice;
          const price = bPrice?.TotalPrice ?? 0;
          const termsRef = pbo.TermsAndConditions?.termsAndConditionsRef;
          const termsRaw = termsMap[termsRef];

          // extract baggage from termsRaw (if present)
          let carryOnKg: number | null = null;
          let checkedKg: number | null = null;
          let paymentTimeLimit: string | null = null;
          let changePenalty: number | null = null;
          let cancelPenalty: number | null = null;

          if (termsRaw) {
            if (Array.isArray(termsRaw.BaggageAllowance)) {
              termsRaw.BaggageAllowance.forEach((bag: any) => {
                const type = bag?.baggageType?.toLowerCase();
                const item = bag?.BaggageItem?.[0];
                const measurement = item?.Measurement?.[0];
                const value = measurement?.value ?? null;
                if (type?.includes('carry')) carryOnKg = value;
                if (
                  type?.includes('checked') ||
                  type?.includes('firstchecked') ||
                  type?.includes('firstcheckedbag')
                )
                  checkedKg = value;
              });
            }
            paymentTimeLimit = termsRaw.PaymentTimeLimit ?? null;

            // penalties array - extract numeric penalty values if available
            if (Array.isArray(termsRaw.Penalties)) {
              const p = termsRaw.Penalties[0];
              if (p) {
                // change
                const change =
                  p.Change?.[0]?.ChangePermitted || p.Change?.[0] || null;
                const changePenaltyEntry =
                  p.Change?.[0]?.Penalty?.[0] ?? p.Change?.[0]?.Penalty?.[0];
                // in many entries there's a different structure, try to find numeric amount
                try {
                  // path: p.Change[0].Penalty[0].Amount.value or .Amount?.value
                  const cp = p.Change?.[0]?.Penalty?.[0]?.Amount?.value;
                  if (typeof cp === 'number') changePenalty = cp;
                } catch (e) {}
                try {
                  const cp2 =
                    p.Change?.[0]?.Penalty?.[0]?.Amount?.minorUnit === 0
                      ? p.Change?.[0]?.Penalty?.[0]?.Amount?.value
                      : p.Change?.[0]?.Penalty?.[0]?.Amount?.value;
                  if (typeof cp2 === 'number') changePenalty = cp2;
                } catch (e) {}

                // cancel
                try {
                  const cancel = p.Cancel?.[0]?.Penalty?.[0]?.Amount?.value;
                  if (typeof cancel === 'number') cancelPenalty = cancel;
                } catch (e) {}
              }
            }
          }

          return {
            brandId: brandRef,
            brandName: brand?.name ?? brandRef,
            price,
            fareBasis:
              product?.PassengerFlight?.[0]?.FlightProduct?.[0]?.fareBasisCode,
            baggage: { carryOnKg, checkedKg, raw: termsRaw?.BaggageAllowance },
            meals:
              brand?.BrandAttribute?.find(
                (a: any) => a.classification === 'Meals'
              )?.inclusion ?? undefined,
            changePenalty,
            cancelPenalty,
            paymentTimeLimit,
            termsId: termsRef ?? null,
            termsRaw: termsRaw ?? null,
          } as UIFare;
        }
      );

      fares.sort((a, b) => a.price - b.price);

      const ui: UIFlight = {
        id: offer.id,
        flightRefs,
        airlineCode: firstFlight?.carrier,
        airline: firstFlight?.carrier, // you can improve mapping to full name if you want
        flightNumber: firstFlight
          ? `${firstFlight.carrier}${firstFlight.number}`
          : undefined,
        departure: {
          airport: firstFlight?.Departure?.location ?? '',
          time: timeHM(firstFlight?.Departure?.time),
          terminal: firstFlight?.Departure?.terminal,
        },
        arrival: {
          airport: lastFlight?.Arrival?.location ?? '',
          time: timeHM(lastFlight?.Arrival?.time),
          terminal: lastFlight?.Arrival?.terminal,
        },
        duration: parsePTDuration(firstFlight?.duration ?? ''),
        direct: flightRefs.length === 1,
        lowestFare: fares[0]?.price ?? 0,
        fares,
      };

      out.push(ui);
    });
  });

  // unique by flightRefs + id if duplicates appear
  return out;
}
