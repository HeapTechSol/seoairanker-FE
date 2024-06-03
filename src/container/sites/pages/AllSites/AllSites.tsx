import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Flex from "@/components/Flex";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Button from "@/components/Button";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import languages from "@/constant/languages";
import countries from "@/constant/countries";
import { EXACT_ROUTES } from "@/constant/routes";
import { ColumnsTypes } from "@/components/Table/types";
import { DeleteIcon, SettingIcon, WarningIcon } from "@/assets/icons/svgs";

import useHandleSitesLogic from "@/container/sites/hooks/useHandleSitesLogic";

import "./AllSites.scss";

const { ADD_SITE, SITES_PAGES } = EXACT_ROUTES;

const AllSites = () => {
  const navigate = useNavigate();
  const { getSitesList, sitesList, handleDeleteSite, deleteSideLoading } =
    useHandleSitesLogic();

  const [show, setShowModel] = useState(false);
  const [siteId, setSiteId] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getSitesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsTypes[] = [
    {
      header: "Site",
      dataKey: "siteUrl",
      sortKey: "siteUrl",
      render: (value) => (
        <span onClick={() => navigate(SITES_PAGES, { state: { siteUrl:value } })}>
          <Typography text={value} color="info" />
        </span>
      ),
    },
    {
      header: "Country",
      dataKey: "country",
      sortKey: "country",
      render: (text) => countries.find((lang) => lang.code === text)?.name,
    },
    {
      header: "Language",
      dataKey: "language",
      sortKey: "language",
      render: (text) => languages.find((lang) => lang.code === text)?.name,
    },
    {
      header: "Business Type",
      dataKey: "businessType",
      sortKey: "businessType",
    },
    { header: "Date", dataKey: "createdAt", sortKey: "createdAt" },
    {
      header: "",
      dataKey: "action",
      render: (_, record) => (
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
            onClick={() => {
              setSiteId(record?.id);
              setShowModel(true);
            }}
          />
        </Flex>
      ),
    },
  ];

  const onSiteSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredSitesList = sitesList?.filter((site) => {
    if (site.siteUrl)
      site.siteUrl?.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  return (
    <Container borderRadius boxShadow className="sites-history">
      <Flex vertical gap={16} align="start">
        <Typography type="h3" text="Added Site List" />
        <Typography text="You can add new site by clicking add new site button below the list." />
        <Divider color="warning" />
        <Input
          name="search_site"
          placeholder="Search"
          onChange={onSiteSearch}
        />
        <Flex vertical gap={32} align="end">
          <Table columns={columns} data={filteredSitesList || []} />
          <Button
            onClick={() => navigate(ADD_SITE)}
            size="sm"
            type="borderRadius"
          >
            Add a New Site
          </Button>
        </Flex>
      </Flex>
      <Modal
        show={show}
        OkText="Delete Site"
        header={false}
        cancelText="Cancel"
        setShowModel={setShowModel}
        OkButtonProperties={{ color: "error" }}
        requestLoading={deleteSideLoading}
        onSubmit={() => handleDeleteSite(siteId as number, setShowModel)}
      >
        <Flex vertical gap={8} align="center" padding={"20px 0px"}>
          {WarningIcon}
          <Typography text="Are you sure you want to delete?" />
        </Flex>
      </Modal>
    </Container>
  );
};

export default AllSites;
