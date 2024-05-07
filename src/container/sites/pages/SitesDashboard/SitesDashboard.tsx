import { Link, useNavigate } from "react-router-dom";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Button from "@/components/Button";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Pagination from "@/components/Pagination/Pagination";
import AddedSiteCard from "@/container/sites/components/AddedSiteCard/AddedSiteCard";

import { EXACT_ROUTES } from "@/constant/routes";

import { DeleteIcon, SearchIcon, SettingIcon } from "@/assets/icons/svgs";

import "./SitesDashboard.scss";

const { ADD_SITE } = EXACT_ROUTES;

const SitesDashboard = () => {
  const navigate = useNavigate();
  type ColumnTypes = {
    header: string;
    dataKey: string;
    sortKey?: string;
    textAlign?: "right" | "center";
    render?: (value: string) => void;
  };
  const columns: ColumnTypes[] = [
    {
      header: "Sites",
      dataKey: "sites",
      sortKey: "sites",

      render: (value) => (
        <Link to="">
          <Typography text={value} color="info" />
        </Link>
      ),
    },
    { header: "Date", dataKey: "date", sortKey: "date" },
    {
      header: "",
      dataKey: "action",

      render: () => (
        <Flex className="site-info-controls" justify="end" align="center">
          <Button
            onlyIcon
            size="sm"
            color="info"
            variant="text"
            StartIcon={SettingIcon}
            onClick={() => console.log("clicked")}
          />
          <Button
            onlyIcon
            size="sm"
            color="error"
            variant="text"
            StartIcon={DeleteIcon}
            fill
            onClick={() => console.log("clicked")}
          />
        </Flex>
      ),
    },
  ];
  const data = [
    {
      sites: "portfolio websites",
      date: "	04-08-24",
    },
    {
      sites: "search optimization",
      date: "	04-16-24",
    },
    {
      sites: "elit fitness",
      date: "	04-25-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
    {
      sites: "search engine marketing",
      date: "	03-10-24",
    },
  ];
  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Typography text="Seode's Dashboard" type="h1"/>
        <Divider color="warning"/>
        <Container className="sites-dashboard-header" borderRadius boxShadow>
          <Flex justify="between">
            <Input
              StartIcon={SearchIcon}
              name="search_site"
              placeholder="Search"
            />
            <Button
              onClick={() => navigate(ADD_SITE)}
              size="sm"
              type="borderRadius"
            >
              Add a New Site
            </Button>
          </Flex>
        </Container>
        <Flex gap={16}>
          <Flex vertical gap={16}>
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <AddedSiteCard />
            <Pagination
              pageSize={10}
              currentPage={1}
              totalCount={75}
              onPageChange={() => console.log("onPage Change")}
            />
          </Flex>
          <Container borderRadius boxShadow className="sites-history">
            <Flex vertical gap={16} align="start">
              <Typography type="h3" text="Add Your Site" />
              <Typography text="It's easy! Just click the button." />
              <Divider color="warning" />
              <Input name="search_site" placeholder="Search" />
              <Divider color="warning" />
              <Table columns={columns} data={data} />
              <Pagination
                pageSize={10}
                currentPage={1}
                totalCount={75}
                noCount
                onPageChange={() => console.log("onPage Change")}
              />
              <Button
                onClick={() => navigate(ADD_SITE)}
                size="sm"
                type="borderRadius"
              >
                Add a New Site
              </Button>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SitesDashboard;
