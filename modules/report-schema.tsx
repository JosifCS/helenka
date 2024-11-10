import { z } from "zod"

const columnSchema = z.object({
	header: z.string(),
	column: z.string(),
})

const foreginIncomeColumnsSchema = z.object({
	dates: columnSchema,
	dateIn: columnSchema.optional(),
	isin: columnSchema,
	name: columnSchema,
	count: columnSchema,
	unitBuy: columnSchema,
	unitSale: columnSchema,
	buyRate: columnSchema.optional(),
	sellRate: columnSchema.optional(),
	expenseCzk: columnSchema.optional(),
	incomeCzk: columnSchema.optional(),
	profitCzk: columnSchema.optional(),
	timeTest: columnSchema.optional(),
})

const czkIncomeColumnsSchema = z.object({
	dates: columnSchema,
	dateIn: columnSchema.optional(),
	isin: columnSchema,
	name: columnSchema,
	count: columnSchema,
	unitBuy: columnSchema.optional(),
	unitSale: columnSchema.optional(),
	expense: columnSchema.optional(),
	income: columnSchema.optional(),
	profit: columnSchema.optional(),
	timeTest: columnSchema.optional(),
})

const currencyHedgingColumnsSchema = z.object({
	name: columnSchema,
	position: columnSchema,
	dateIn: columnSchema,
	dateOut: columnSchema,
	buyRate: columnSchema,
	sellRate: columnSchema,
	profit: columnSchema,
})

const feesColumnsSchema = z.object({
	date: columnSchema,
	name: columnSchema,
	fee: columnSchema,
})

const dividendsColumnsSchema = z.object({
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
