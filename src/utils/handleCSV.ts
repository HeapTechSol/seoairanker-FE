import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { MaybeNull, Unknown } from './commonTypes'

export type ExcelColumn = Partial<ExcelJS.Column>
export type ExcelRow = ExcelJS.RowValues

type CSVDataType = {
  data: ExcelRow[]
  columns: ExcelColumn[]
  topHeader?: Unknown[]
  headerRowIndex?: number
  header?: string[]
}
type SingleExcelFileType = {
  csvData?: MaybeNull<CSVDataType>
  fileName?: string
}

export type SheetsType = Omit<CSVDataType, 'fileName'> & {
  name: string
  topHeader?: [string, string]
  header?: string
  headerRowIndex: number
  sheetName: string
}
export type MultipleSheetType = {
  sheets: SheetsType[]
  fileName: string
}

export const createMultiSheetExcel = async (data: MultipleSheetType) => {
  const workbook = new ExcelJS.Workbook()
  const { fileName, sheets } = data

  sheets?.forEach((sheet) => {
    const worksheet = workbook.addWorksheet(sheet?.sheetName)

    if (sheet?.topHeader) {
      sheet.topHeader.forEach((row, index) => {
        worksheet.addRow(row)
        worksheet.getRow(index + 1).getCell(1).style = {
          font: {
            bold: true,
          },
        }
      })
    }
    worksheet.getRow(sheet?.headerRowIndex || 1).values = sheet?.header || []

    worksheet.columns = sheet?.columns
    worksheet.getRow(sheet?.headerRowIndex || 1).font = { bold: true }
    sheet?.data?.forEach((row) => {
      worksheet.addRow(row)
    })

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { ...cell.font, name: 'Arial' }
      })
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()

  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}_${Date.now()}.xlsx`)
}

export const createSingleExcelFile = async ({ csvData = null, fileName = 'filename' }: SingleExcelFileType) => {
  const workbook = new ExcelJS.Workbook()

  const worksheet = workbook.addWorksheet()
  if (csvData) {
    worksheet.columns = csvData.columns
    worksheet.getRow(1).font = { bold: true }

    csvData.data.forEach((row) => {
      worksheet.addRow(row)
    })

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { ...cell.font, name: 'Arial' }
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()

    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}_${Date.now()}.xlsx`)
  }
}
