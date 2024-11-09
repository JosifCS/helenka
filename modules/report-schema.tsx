import { z } from "zod"

const columnSchema = z.object({
	header: z.string(),
	column: z.string(),
})

const foreginIncomeColumnsSchema = z.object({
	id: columnSchema.optional(),
	dates: columnSchema,
	dateIn: columnSchema.optional(),
	isin: columnSchema,
	name: columnSchema,
	count: columnSchema,
	unitBuy: columnSchema,
	unitSell: columnSchema,
	buyRate: columnSchema.optional(),
	sellRate: columnSchema.optional(),
	expenseCzk: columnSchema.optional(),
	incomeCzk: columnSchema.optional(),
	profitCzk: columnSchema.optional(),
	timeTest: columnSchema,
})

const czkIncomeColumnsSchema = z.object({
	id: columnSchema.optional(),
	dates: columnSchema,
	dateIn: columnSchema.optional(),
	isin: columnSchema,
	name: columnSchema,
	count: columnSchema,
	unitBuy: columnSchema,
	unitSell: columnSchema,
	expense: columnSchema.optional(),
	income: columnSchema.optional(),
	profit: columnSchema.optional(),
	timeTest: columnSchema,
})

const incomeColumnsSchema = z.object({
	id: columnSchema.optional(),
	dateIn: columnSchema,
	dateOut: columnSchema,
	isin: columnSchema,
	name: columnSchema,
	count: columnSchema,
	unitBuy: columnSchema,
	unitSell: columnSchema,
})

const currencyHedgingColumnsSchema = z.object({
	id: columnSchema.optional(),
	name: columnSchema,
	position: columnSchema,
	dateIn: columnSchema,
	dateOut: columnSchema,
	buyRate: columnSchema,
	sellRate: columnSchema,
	profit: columnSchema,
})

const feesColumnsSchema = z.object({
	id: columnSchema.optional(),
	date: columnSchema,
	name: columnSchema,
	fee: columnSchema,
})

const dividendsColumnsSchema = z.object({
	id: columnSchema.optional(),
	date: columnSchema,
	isin: columnSchema,
	name: columnSchema,
	gross: columnSchema,
	rate: columnSchema.optional(),
	grossCzk: columnSchema.optional(),
	sourceWithholdingTax: columnSchema.optional(),
	czWithholdingTax: columnSchema.optional(),
	sourceWithholdingTaxValue: columnSchema.optional(),
	czWithholdingTaxValue: columnSchema.optional(),
	creditedTax: columnSchema.optional(),
})

export const reportSchema = z.object({
	broker: z.enum(["portu", "xtb", "etoro"]),
	version: z.number(),
	description: z.string().optional(),
	incomesUsd: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: foreginIncomeColumnsSchema,
		})
		.optional(),
	incomesEur: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: foreginIncomeColumnsSchema,
		})
		.optional(),
	incomesCzk: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: czkIncomeColumnsSchema,
		})
		.optional(),
	incomes: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: incomeColumnsSchema,
		})
		.optional(),
	currencyHedging: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: currencyHedgingColumnsSchema,
		})
		.optional(),
	fees: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: feesColumnsSchema,
		})
		.optional(),
	dividendsUsd: z
		.object({
			name: z.string().optional(),
			sheet: z.string().optional(),
			columns: dividendsColumnsSchema,
		})
		.optional(),
})

export type ReportSchema = z.infer<typeof reportSchema>
