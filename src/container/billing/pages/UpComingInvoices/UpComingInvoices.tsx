import { useState } from "react";

import Flex from "@/components/Flex";
import Table from "@/components/Table";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import TableDataCell from "@/components/Table/TableDataCell";
import { rowSelectionHandler } from "@/components/Table/helper";

import { ColumnsTypes } from "@/components/Table/types";

import "./UpComingInvoices.scss";

const UpComingInvoices = () => {
  const [selectedRowKeys, setSelectedRows] = useState<string[]>([]);

  const columns:ColumnsTypes[] = [
    { header: "DESCRIPTION", dataKey: "description" },
    {
      header: "QTY",
      dataKey: "qty",
    },
    { header: "UNIT PRICE", dataKey: "unit_price", textAlign: "center" },
    {
      header: "AMOUNT",
      dataKey: "amount",
      textAlign: "center",
    },
  ];

  type DataType = {
    [key: string]: string | Record<string, string>[];
  }

  type RecordDataType = {
    data:DataType[]
  }

  const data:DataType[] = [
    {
      description: "APR 19 - MAY 19, 2024",
      data: [
        {
          description: "Optimized Page Schema (per schema)",
          qty: "0",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "Optimized Meta Title (per title)",
          qty: "247",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "First 1 500",
          qty: "247",
          unit_price: "$0.00",
          amount: "$0.00",
        },
        {
          description: "Optimized Meta Description (per description)",
          qty: "781",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "Optimized Meta Title (per title)",
          qty: "781",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "First 1 500",
          qty: "0",
          unit_price: "$0.00",
          amount: "$0.00",
        },
        {
          description: "Rankings Update (per update)",
          qty: "0",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "Page Crawl (per crawl)",
          qty: "24054",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "First 45 000",
          qty: "24054",
          unit_price: "",
          amount: "$0.00",
        },
        {
          description: "Flat fee for first 45 000",
          qty: "24054",
          unit_price: "",
          amount: "$0.00",
        },
      ],
    },
    {
      description: "APR 19 - MAY 19, 2024",
      data: [
        {
          description: "Agency",
          qty: "1",
          unit_price: "$499.00",
          amount: "$499.00",
        },
        {
          description: "AI Engine",
          qty: "1",
          unit_price: "$39.00",
          amount: "$39.00",
        },
        {
          description: "Extra Pages",
          qty: "3000",
          unit_price: "$9.99 per 250",
          amount: "$119.88",
        },
      ],
    },
    {
      description: "",
      data: [
        {
          description: "",
          qty: "",
          unit_price: "Subtotal",
          amount: "$657.88",
        },
        {
          description: "",
          qty: "",
          unit_price: "Total",
          amount: "$657.88",
        },
        {
          description: "",
          qty: "",
          unit_price: "Amount due",
          amount: "$657.88",
        },
      ],
    },
  ];

  return (
    <Container
      contentCenter
      fullHeight
      className="up-coming-invoices"
      padding={40}
    >
      <Flex vertical gap={32}>
        <Typography text="Upcoming Invoice" type="h1" size="lg" />
        <Flex vertical gap={8}>
          <Typography text="This is a preview of the upcoming invoice that will be billed on May 19, 2024." />
          <Typography text="Updates hourly, last updated on May 5, 2024 at 12:30:02 PM." />
        </Flex>
        <Table
          columns={columns}
          data={data}
          expandable={{
            expandedRowRender: (record:RecordDataType) => (
              <>
                {record?.data?.map((data, index) => (
                  <tr>
                    {columns?.map((column) => (
                      <TableDataCell
                        row={data}
                        column={column}
                        index={index}
                        key={`rows-${index}`}
                      />
                    ))}
                  </tr>
                ))}
              </>
            ),
          }}
          onRowSelection={{
            type: "",
            selectedRowKeys,
            allRowsOpenedByDefault: true,
            onChange: (newSelectedKeys: string | string[]) => {
              setSelectedRows((prev) =>
                rowSelectionHandler(prev, newSelectedKeys)
              );
            },
          }}
          rowKey={"date"}
        />
      </Flex>
    </Container>
  );
};

export default UpComingInvoices;
