import { DateRange } from "./global";

/** Souhrn. */
export type PortuTotals = {
  /** Celkem zdanitelné příjmy z prodeje cenných papírů. */
  paperIncome: number;
  /** Celkem zdanitelné příjmy z prodeje cenných papírů (mimo osvobozených na základě časového testu). */
  paperIncomeExcluding: number;
  /** Celkem výdaje spojené s pořízením a držbou cenných papírů (mimo osvobozených na základě časového testu). */
  papertotalExpenses: number;
  /** Dílčí základ daně dle §10 zákona. */
  taxBaseBase10: number;
  /** Příjmy z měnového zajištění. */
  currencyIncome: number;
  /** Výdaje z měnového zajištění. */
  currencyexpenses: number;
  /** Dílčí základ daně. */
  currencyTaxBase: number;
  /** Hrubá hodnota připsaných dividend. */
  grossDividends: number;
  /** Hodnota srážkové daně k zápočtu. */
  dividendsTax: number;
  /** Celkem hodnota zaplacené daně ve státě zdroje příjmu. */
  dividendsPaidTaxUsd: number;
  /** Celkem hodnota zaplacené daně ve státě zdroje příjmu (v CZK). */
  dividendsPaidTax: number;
  /** Celkem hrubá hodnota připsaných úroků. */
  grossInterest: number;
  /** Součet dílčích základů daně §7-10 zákona. */
  taxBases7to10: number;
};

/** Řádek záznamu nákupu a prodeje v korunách. */
export type PortuDomesticIncome = {
  /** #. */
  id: number;
  /** Datum prodeje/nákupu. */
  dates: DateRange;
  /** Datum nakupu. */
  purchaseDate: Date;
  /** ISIN. */
  isin: string;
  /** Instrument. */
  instrument: string;
  /** Počet prodaných kusů. */
  unitsCount: number;
  /** Nákupní cena* v původní měně. */
  purchase: number;
  /** Prodejní cena v původní měně. */
  sell: number;
  /** Příjem z prodeje (v CZK). */
  incomeCzk: number;
  /** Výdaj na pořízení a prodej (v CZK). */
  expensesCzk: number;
  /** Zisk/ztráta** (v CZK). */
  profitCzk: number;
  /** Splněn časový test?. */
  timeTest: string;
};

/** Řádek záznamu nákupu a prodeje v cizí měně. */
export type PortuForeginIncome = PortuDomesticIncome & {
  /** Kurz USD/CZK - při nákupu. */
  purchaseExchange: number;
  /** Kurz USD/CZK - při prodeji. */
  sellExchange: number;
};

/** Příjem/výdaj na měnové zajištění. */
export type PortuCurrencyHedging = {
  /** #. */
  id: number;
  /** Instrument. */
  instrument: string;
  /** Pozice. */
  position: number;
  /** Datum sjednání. */
  appointmentDate: Date;
  /** Datum splatnosti. */
  dueDate: Date;
  /** Kurz při sjednání. */
  appointmentCourse: number;
  /** Kurz pro den splatnosti. */
  dueCourse: number;
  /** Příjem/výdaj (v CZK). */
  income: number;
};

export type PortuFee = {
  /** Příjem/výdaj (v CZK). */
  id: number;
  /** Datum. */
  date: Date;
  /** Typ poplatku. */
  type: string;
  /** Hodnota v CZK. */
  value: number;
};

/** Připsané dividendy v USD. */
export type PortuDividend = {
  /** #. */
  id: number;
  /** Datum. */
  date: Date;
  /** ISIN. */
  isin: string;
  /** Instrument. */
  instrument: string;
  /** Hrubá hodnota (v USD). */
  grossValue: number;
  /** Kurz USD/CZK. */
  course: number;
  /** Hrubá hodnota* (v CZK). */
  grossValueCzk: number;
  /** Sazba SD ve státě zdroje příjmu. */
  sourceCountryTax: number;
  /** Sazba SD dle SZDZ. */
  taxPercent: number;
  /** Hodnota sražené daně ve státě zdroje (v USD). */
  taxUsd: number;
  /** Hodnota sražené daně ve státě zdroje (v CZK). */
  taxCzk: number;
  /** Hodnota daně k zápočtu (v CZK). */
  taxCounted: number;
};

export type PortuAnnualReport = {
  /** Souhrn. */
  totals: PortuTotals;
  /** Příjmy v USD. */
  usdIncomes: PortuForeginIncome[];
  /** Příjmy v EUR. */
  eurIncomes: PortuForeginIncome[];
  /** Příjmy v CZK. */
  czkIncomes: PortuDomesticIncome[];
  /** Příjem/výdaj na měnové zajištění. */
  currencyHedging: PortuCurrencyHedging[];
  /** Naúčtované poplatky v CZK. */
  fees: PortuFee[];
  /** Připsané dividendy v USD, Irsko. */
  dividends: PortuDividend[];
};
