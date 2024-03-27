import Button from "@/components/Button";
import Flex from "@/components/Flex";
import Table from "@/components/Table";
import { ColumnsTypes } from "@/components/Table/types";
import { useNavigate } from "react-router-dom";

import { EXACT_ROUTES } from "@/constant/routes";

const { APPLY_LEAVE, PENDING_LEAVES } = EXACT_ROUTES;

const LeaveBalance = () => {
  const navigate = useNavigate();
  const columns: ColumnsTypes[] = [
    {
      header: "Leave Type",
      dataKey: "type",
      textAlign: "center",
    },
    {
      header: "Carry Forward",
      dataKey: "carryForward",
      textAlign: "center",
    },
    {
      header: "Annual Entitlement",
      dataKey: "annualEntitlement",
      textAlign: "center",
    },
    {
      header: "Availed",
      dataKey: "availed",
      textAlign: "center",
    },
    {
      header: "En_Cashed",
      dataKey: "en_cashed",
      textAlign: "center",
    },
    {
      header: "Deducted",
      dataKey: "deducted",
      textAlign: "center",
    },
    {
      header: "Available Balance",
      dataKey: "available",
      textAlign: "center",
    },
    {
      header: "Action",
      dataKey: "",
      textAlign: "center",
      render: () => <span>Get Details</span>,
    },
  ];

  const data = [
    {
      type: "Annual Leave",
      carryForward: 0,
      annualEntitlement: 10,
      availed: 0,
      en_cashed: 0,
      deducted: 0,
      available: 10,
    },
    {
      type: "Casual Leave",
      carryForward: 0,
      annualEntitlement: 5,
      availed: 0,
      en_cashed: 0,
      deducted: 0,
      available: 5,
    },
    {
      type: "Compensatory Leave",
      carryForward: 0,
      annualEntitlement: 0,
      availed: 0,
      en_cashed: 0,
      deducted: 0,
      available: 0,
    },
    {
      type: "Sick Leave",
      carryForward: 0,
      annualEntitlement: 5,
      availed: 0,
      en_cashed: 0,
      deducted: 0,
      available: 5,
    },
  ];
  return (
    <Flex vertical align="end" gap={24}>
      <Flex gap={12} justify="end">
        <Button onClick={() => navigate(APPLY_LEAVE)} borderRadius>
          Apply Leave
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(PENDING_LEAVES)}
          borderRadius
        >
          Pending Leaves
        </Button>
      </Flex>
      <Table columns={columns} data={data} />
    </Flex>
  );
};

export default LeaveBalance;
