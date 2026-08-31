import React from "react";
import { Scissors, Clock } from "lucide-react";
import SpecialBadge from "./SpecialBadge";

const formatPrice = (n) => `R${Number(n).toFixed(2)}`;
const formatDuration = (mins) => (mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 ? ` ${mins % 60}m` : ""}` : `${mins} min`);

const ServiceCard = ({ service, onAdd }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-noir">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mauve/20 to-noir text-cream/20">
            <Scissors size={40} />
          </div>
        )}
        {service.isSpecial && <SpecialBadge />}
        {!service.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-noir/70">
            <span className="rounded border border-cream/30 px-3 py-1 text-xs uppercase tracking-wide text-cream/80">
              Fully booked
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug">{service.name}</h3>
          <div className="shrink-0 text-right">
            {service.isSpecial && service.originalPrice ? (
              <div className="text-xs text-cream/40 line-through">{formatPrice(service.originalPrice)}</div>
            ) : null}
            <div className={`font-display text-lg ${service.isSpecial ? "text-champagne" : "text-cream"}`}>
              {formatPrice(service.price)}
            </div>
          </div>
        </div>
        {service.description && (
          <p className="text-sm leading-relaxed text-cream/60">{service.description}</p>
        )}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-cream/40">
          <Clock size={13} /> {formatDuration(service.durationMinutes)}
        </div>
        {onAdd && (
          <button
            onClick={() => onAdd(service)}
            disabled={!service.available}
            className="mt-2 self-start rounded border border-cream/20 px-4 py-2 text-xs font-semibold text-cream/80 transition-colors hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30"
          >
            Add to appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
