import Flex from "@/components/Flex";
import Table from "@/components/Table";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Pagination from "@/components/Pagination/Pagination";

import { PAGES_COLUMN, PAGES_DATA } from "@/container/sites/utils";

import "./SitePages.scss";
import { useState } from "react";

const SitePages = () => {
  const [selectedRowKeys, SetSelectedRowKeys] = useState<string[]>([]);

  const rowSelectionHandler = (
    alreadySelectedKeys: string[],
    newSelectedKey: string | string[]
  ) => {
    if (Array.isArray(newSelectedKey)) {
      if (alreadySelectedKeys.length == newSelectedKey.length) return [];
      return newSelectedKey;
    }
    if (alreadySelectedKeys.includes(newSelectedKey))
      return alreadySelectedKeys.filter((item) => item != newSelectedKey);
    return [...alreadySelectedKeys, newSelectedKey];
  };

  console.log("selectedRowKeys",selectedRowKeys)
  return (
    <Container className="add-new-keywords-container">
      <Flex vertical gap={16}>
        <Typography text="Pages on www.dinakubik.se" type="h1" />
        <Divider color="warning" />
        <Flex gap={16} className="container-screens">
          <Container
            borderRadius
            boxShadow
            padding={"40px"}
            className="recommended-keywords-table-container"
          >
            <Flex vertical gap={16}>
              <Typography text="Found Pages" type="h2" />
              <Typography
                text={`We routinely crawl www.dinakubik.se in order to understand your site structure and to better identify potential SEO improvements. Here are the pages we found. Click the toggle icon to ignore pages on future crawls.`}
              />
              <Typography
                text={`You have approved 1 recommendation. Click any link below to see them live.`}
              />
              <Typography
                text={`Status: completed (last crawled 3 days ago)`}
              />
              <Divider color="warning" />
              <Table
                columns={PAGES_COLUMN}
                data={PAGES_DATA}
                style={{
                  tableCellStyle: {
                    fontSize: "14px",
                  },
                  tableHeadingStyle: {
                    fontSize: "10.5px",
                  },
                }}
                onRowSelection={{
                  type: "chekbox",
                  selectedRowKeys,
                  onChange: (newSelectedKeys: string | string[]) => {
                    SetSelectedRowKeys((prev) =>
                      rowSelectionHandler(prev, newSelectedKeys)
                    );
                  },
                }}
                rowKey="path"
              />
              <Pagination
                pageSize={10}
                currentPage={1}
                totalCount={75}
                onPageChange={() => console.log("onPage Change")}
                showSizeChanger={{
                  pageSizeOptions: [
                    { label: "10", id: "10" },
                    { label: "25", id: "25" },
                    { label: "50", id: "50" },
                  ],
                  onPageSizeChange: () => console.log("page size changing"),
                }}
              />
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SitePages;
