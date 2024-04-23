import { useForm } from "react-hook-form";

import Stepper from "@/components/Stepper";
import Container from "@/components/Container/Container";
import AddSite from "@/container/sites/components/AddSite/AddSite";
import AddKeywords from "@/container/sites/components/AddKeywords/AddKeywords";
import KeywordsInfo from "@/container/sites/components/KeywordsInfo/KeywordsInfo";
import AddSiteDetails from "@/container/sites/components/AddSiteDetails/AddSiteDetails";

import "./AddSiteWizard.scss";

const AddSiteWizard = () => {
  const { control } = useForm();

  const steps = [
    {
      title: "Add Site",
      stepLabel: "1",
      component: <AddSite control={control} />,
    },
    {
      title: "Details",
      stepLabel: "2",
      component: <AddSiteDetails control={control} />,
    },
    {
      title: "Keywords",
      stepLabel: "3",
      component: <KeywordsInfo/>,
    },
    {
      title: "Automation",
      stepLabel: "4",
      component: <AddKeywords/>,
    },
    {
      title: "Install",
      stepLabel: "5",
      component: <h1>Explore Site</h1>,
    },
  ];
  return (
    <Container borderRadius boxShadow className="add-site-wizard">
      <Stepper steps={steps} />
    </Container>
  );
};

export default AddSiteWizard;
