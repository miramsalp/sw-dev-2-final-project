"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./Button";

/* ---------- date helpers (local calendar dates as "YYYY-MM-DD") ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (key: string, n: number) => {
  const d = fromKey(key);
  return toKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
};
/** Same day in another month/year, clamped to that month's length. */
const moveTo = (key: string, year: number, month: number) => {
  const day = Math.min(fromKey(key).getDate(), new Date(year, month + 1, 0).getDate());
  return toKey(new Date(year, month, day));
};
const format = (key: string, options: Intl.DateTimeFormatOptions) =>
  fromKey(key).toLocaleDateString("en-GB", options);
const toTyped = (key: string) => {
  const [y, m, d] = key.split("-");
  return `${d}/${m}/${y}`;
};
const parseTyped = (text: string) => {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
  if (!match) return null;
  const [d, m, y] = match.slice(1).map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? toKey(date) : null;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const iconButton =
  "flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-black";
const textButton =
  "h-10 cursor-pointer px-3 text-sm font-semibold hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-black";

type View = "days" | "years" | "input";

/**
 * Date field with a "Select date" popover (day grid, month/year navigation, typed entry).
 * `value` and `min` are "YYYY-MM-DD"; picking a day only becomes the value after OK.
 */
export function DatePicker({
  value,
  onChange,
  min,
  ariaLabel,
  placeholder = "Date",
}: {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  ariaLabel: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const [today, setToday] = useState("");
  const [draft, setDraft] = useState(value);
  const [cursor, setCursor] = useState(value);
  const [typed, setTyped] = useState("");
  const [typedError, setTypedError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusDay = useRef(false);
  const dialogId = useId();

  const clampMin = (key: string) => (min && key < min ? min : key);

  const openPicker = () => {
    const now = toKey(new Date());
    setToday(now);
    setDraft(value);
    setCursor(value || clampMin(now));
    setTyped(value ? toTyped(value) : "");
    setTypedError(null);
    setView("days");
    focusDay.current = true;
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const commit = (next: string) => {
    onChange(next);
    close();
  };

  const confirmPick = () => {
    if (view !== "input") return draft ? commit(draft) : close();
    const parsed = parseTyped(typed);
    if (!parsed) return setTypedError("Use DD/MM/YYYY");
    if (min && parsed < min) return setTypedError("Date cannot be in the past");
    commit(parsed);
  };

  // Close (discarding the draft) when clicking anywhere outside the picker.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep keyboard focus on the active day after opening or arrow-key moves.
  useEffect(() => {
    if (!open || view !== "days" || !focusDay.current) return;
    focusDay.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${cursor}"]`)?.focus();
  }, [open, view, cursor]);

  // `cursor` is always set while open; the fallback only feeds the (unrendered) closed state.
  const shown = fromKey(cursor || today || "2000-01-01");
  const year = shown.getFullYear();
  const month = shown.getMonth();
  const minDate = min ? fromKey(min) : null;
  const atMinMonth = !!minDate && year === minDate.getFullYear() && month === minDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstYear = minDate?.getFullYear() ?? year;
  const years = [firstYear, firstYear + 1, firstYear + 2];

  const showMonth = (offset: number) => setCursor(clampMin(moveTo(cursor, year, month + offset)));

  const onGridKeyDown = (e: React.KeyboardEvent) => {
    const weekday = fromKey(cursor).getDay();
    const steps: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekday,
      End: 6 - weekday,
    };
    let next: string | null = null;
    if (e.key in steps) next = addDays(cursor, steps[e.key]);
    if (e.key === "PageUp") next = moveTo(cursor, year, month - 1);
    if (e.key === "PageDown") next = moveTo(cursor, year, month + 1);
    if (!next) return;
    e.preventDefault();
    focusDay.current = true;
    setCursor(clampMin(next));
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        aria-label={value ? `${ariaLabel}: ${format(value, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}` : ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => (open ? close() : openPicker())}
        className="flex h-12 w-full cursor-pointer items-center justify-between border-b border-black bg-[#f0f0f0] px-3.5 pt-[11px] pb-1 text-left text-xl font-medium"
      >
        <span className={value ? "text-black" : "text-[#717171]"}>
          {value ? format(value, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : placeholder}
        </span>
        <CalendarIcon />
      </button>

      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-label="Select date"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            }
          }}
          className="absolute top-full left-0 z-20 mt-2 w-[360px] max-w-[calc(100vw-32px)] border-2 border-black bg-white font-plex text-black shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        >
          {/* header */}
          <div className="px-6 pt-4 pb-3">
            <p className="text-sm font-medium text-[#555]">Select date</p>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-[32px] leading-10">
                {draft ? format(draft, { weekday: "short", day: "numeric", month: "short" }) : "Select a day"}
              </p>
              <button
                type="button"
                aria-label={view === "input" ? "Switch to calendar" : "Type a date"}
                onClick={() => {
                  if (view === "input") {
                    focusDay.current = true;
                    setView("days");
                  } else {
                    setTyped(draft ? toTyped(draft) : "");
                    setTypedError(null);
                    setView("input");
                  }
                }}
                className={iconButton}
              >
                {view === "input" ? <CalendarIcon /> : <PencilIcon />}
              </button>
            </div>
          </div>
          <div className="border-t border-[#d9d9d9]" />

          {view === "input" ? (
            <div className="px-6 py-6">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Date
                <input
                  autoFocus
                  inputMode="numeric"
                  placeholder="DD/MM/YYYY"
                  value={typed}
                  onChange={(e) => {
                    setTyped(e.target.value);
                    setTypedError(null);
                    const parsed = parseTyped(e.target.value);
                    if (parsed && (!min || parsed >= min)) setDraft(parsed);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirmPick();
                    }
                  }}
                  aria-invalid={!!typedError}
                  className="h-12 w-full border-b border-black bg-[#f0f0f0] px-3.5 text-xl font-medium placeholder:text-[#717171]"
                />
              </label>
              {typedError && (
                <p role="alert" className="mt-2 text-sm font-medium text-[#d93025]">
                  {typedError}
                </p>
              )}
            </div>
          ) : (
            <>
              {/* month row */}
              <div className="flex items-center justify-between px-4 pt-2">
                <button
                  type="button"
                  aria-label={view === "years" ? "Back to days" : "Choose year"}
                  onClick={() => {
                    focusDay.current = view === "years";
                    setView(view === "years" ? "days" : "years");
                  }}
                  className="flex h-10 cursor-pointer items-center gap-1 rounded-full px-2 text-sm font-semibold hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-black"
                >
                  {format(toKey(new Date(year, month, 1)), { month: "long", year: "numeric" })}
                  <svg aria-hidden width="10" height="6" viewBox="0 0 10 6" className={view === "years" ? "rotate-180" : ""}>
                    <path d="M0 0l5 6 5-6z" fill="currentColor" />
                  </svg>
                </button>
                {view === "days" && (
                  <div className="flex">
                    <button type="button" aria-label="Previous month" disabled={atMinMonth} onClick={() => showMonth(-1)} className={iconButton}>
                      <Chevron dir="left" />
                    </button>
                    <button type="button" aria-label="Next month" onClick={() => showMonth(1)} className={iconButton}>
                      <Chevron dir="right" />
                    </button>
                  </div>
                )}
              </div>

              {view === "years" ? (
                <div className="grid grid-cols-3 gap-2 px-4 py-6">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      aria-pressed={y === year}
                      onClick={() => {
                        focusDay.current = true;
                        setCursor(clampMin(moveTo(cursor, y, month)));
                        setView("days");
                      }}
                      className={`h-10 cursor-pointer rounded-full text-base focus-visible:outline-2 focus-visible:outline-black ${
                        y === year ? "bg-[#ee7d57] font-semibold text-white" : "hover:bg-[#ffe3d9]"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3">
                  <div className="grid h-12 grid-cols-7 items-center text-center text-sm" aria-hidden>
                    {WEEKDAYS.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div ref={gridRef} role="group" aria-label="Days" onKeyDown={onGridKeyDown} className="grid grid-cols-7">
                    {Array.from({ length: firstWeekday }, (_, i) => (
                      <span key={`blank-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const key = toKey(new Date(year, month, i + 1));
                      const disabled = !!min && key < min;
                      const selected = key === draft;
                      const isToday = key === today;
                      return (
                        <div key={key} className="flex h-12 items-center justify-center">
                          <button
                            type="button"
                            data-date={key}
                            tabIndex={key === cursor ? 0 : -1}
                            disabled={disabled}
                            aria-pressed={selected}
                            aria-current={isToday ? "date" : undefined}
                            aria-label={format(key, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            onClick={() => {
                              setDraft(key);
                              setCursor(key);
                            }}
                            className={`size-10 rounded-full text-base focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black ${
                              disabled
                                ? "cursor-not-allowed text-black/30"
                                : selected
                                  ? "cursor-pointer bg-[#ee7d57] font-semibold text-white"
                                  : isToday
                                    ? "cursor-pointer border border-[#ee7d57] text-[#ee7d57] hover:bg-[#ffe3d9]"
                                    : "cursor-pointer hover:bg-[#ffe3d9]"
                            }`}
                          >
                            {i + 1}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* footer */}
          <div className="flex items-center justify-between px-3 pt-2 pb-3">
            <button type="button" onClick={() => commit("")} className={textButton}>
              Clear
            </button>
            <div className="flex items-center gap-1">
              <button type="button" onClick={close} className={textButton}>
                Cancel
              </button>
              <Button type="button" size="sm" onClick={confirmPick} className="h-8 min-w-14 cursor-pointer">
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="4" width="15" height="13.5" />
      <path d="M2.5 8h15M6.5 2v4M13.5 2v4" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 14.25V17h2.75l8.1-8.1-2.75-2.75L3 14.25zm12.95-7.45a.73.73 0 000-1.03l-1.72-1.72a.73.73 0 00-1.03 0l-1.34 1.34 2.75 2.75 1.34-1.34z" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={dir === "left" ? "M6.5 1L1.5 6l5 5" : "M1.5 1l5 5-5 5"} />
    </svg>
  );
}
