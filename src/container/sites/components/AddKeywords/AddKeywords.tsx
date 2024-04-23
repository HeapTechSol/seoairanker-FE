import {
  PercentageCircleIcon,
  SeodeIcon,
  WatchIcon,
} from "@/assets/icons/svgs";
import Container from "@/components/Container/Container";
import Flex from "@/components/Flex";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table";
import Typography from "@/components/Typography/Typography";

type ColumnTypes = {
  header:string;
  dataKey:string;
  textAlign?:'right' | 'center',
  render?:(value:string)=>void
}

const AddKeywords = () => {

  const columns: ColumnTypes[] = [
    { header: "KEYWORD", dataKey: "keyword" },
    { header: "CURRENT POSITION", dataKey: "position" },
    { header: "MONTHLY SEARCHES", dataKey: "monthly_searches" },
    { header: "COST PER CLICK", dataKey: "cost_per_click" },
    {
      header: "SCORE",
      dataKey: "score",
      textAlign: "center",
      render: (value: string) =>
        value === "waiting" ? (
          WatchIcon
        ) : (
          <PercentageCircleIcon percentage={value} />
        ),
    },
  ];
  const data = [
    {
      keyword: "portfolio websites",
      position: "79",
      monthly_searches: "30",
      cost_per_click: "$6.02",
      score: "waiting",
    },
    {
      keyword: "search optimization",
      position: "N/A",
      monthly_searches: "1,35,000",
      cost_per_click: "$4.23",
      score: "waiting",
    },
    {
      keyword: "elit fitness",
      position: "92",
      monthly_searches: "720",
      cost_per_click: "$1.42",
      score: "70",
    },
    {
      keyword: "search engine marketing",
      position: "N/A",
      monthly_searches: "5,50,000",
      cost_per_click: "$2.39",
      score: "100",
    },
  ];
  return (
    <Container
      width={100}
      borderRadius
      boxShadow
      padding={"40px 20px"}
      className="add-site-container"
    >
      <Flex vertical gap={32} align="center">
        {SeodeIcon}
        <Flex vertical gap={16}>
          <Typography text={`Add Your Keywords`} type="h3" />
          <Typography text="Click on any suggestion to add it to your list of keywords. Don't overthink it, you can always add and and remove keywords" />
          <Typography text="If your site is new or still under construction, the keywords suggestion may not be accurate. Just click 'Next' for now, and we will add more keywords later." />
          <Typography text="You'll be able to add you own (with local targeting) later on, but let's start with these." />
          <Table columns={columns} data={data} />
          <Pagination
            pageSize={10}
            currentPage={1}
            totalCount={75}
            onPageChange={() => console.log("onPage Change")}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default AddKeywords;
