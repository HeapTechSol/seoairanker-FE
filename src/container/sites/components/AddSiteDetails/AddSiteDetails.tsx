import { Control, Controller, useWatch } from "react-hook-form";

import Flex from "@/components/Flex";
import Select from "@/components/Select";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import { SeodeIcon } from "@/assets/icons/svgs";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddSiteDetails = ({ control }: { control: Control<any> }) => {
  const siteUrl = useWatch({ control, name: "site_url" });
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
          <Typography text={`Tell us about ${siteUrl ?? ""}`} type="h3" />
          <Divider/>
          <Typography text="Some info about your business and traffic will help us tailor our recommendations to your needs." />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                Options={[
                  { label: "Type 1", id: "type1" },
                  { label: "Type 2", id: "type1" },
                  { label: "Type 3", id: "type1" },
                  { label: "Type 4", id: "type1" },
                  { label: "Type 5", id: "type1" },
                ]}
                title="Type of Business"
                placeholder="Select business type"
                titlePosition="top"
                setValues={onChange}
                values={value}
              />
            )}
            name="business_type"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                Options={[
                  { label: "Pakistan", id: "type1" },
                  { label: "India", id: "type1" },
                  { label: "Iran", id: "type1" },
                  { label: "China", id: "type1" },
                  { label: "USA", id: "type1" },
                ]}
                title="Primary Search Country"
                placeholder="Select search country"
                titlePosition="top"
                setValues={onChange}
                values={value}
              />
            )}
            name="search_country"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                Options={[
                  { label: "English (en)", id: "type1" },
                  { label: "Urdu", id: "type1" },
                  { label: "Chinese", id: "type1" },
                  { label: "Hindi", id: "type1" },
                  { label: "Korean", id: "type1" },
                ]}
                title="Primary Language"
                placeholder="Select primary language"
                titlePosition="top"
                setValues={onChange}
                values={value}
              />
            )}
            name="preferred_language"
            control={control}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default AddSiteDetails;
