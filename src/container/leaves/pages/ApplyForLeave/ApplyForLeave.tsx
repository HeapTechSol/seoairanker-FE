import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Flex from "@/components/Flex";
import Select from "@/components/Select";
import Button from "@/components/Button";

import useApplyLeave from "@/container/leaves/hooks/useApplyLeave";

import { leaveOptions } from "@/container/leaves/utils";
import { EXACT_ROUTES } from "@/constant/routes";

const { LEAVE_BALANCE, PENDING_LEAVES } = EXACT_ROUTES;

const ApplyForLeave = () => {
  const navigate = useNavigate();
  const { control } = useApplyLeave();

  return (
    <Flex vertical align="end" gap={24}>
      <Button variant="outlined" onClick={() => navigate(LEAVE_BALANCE)}>
        Check Leave Balance
      </Button>
      <Flex align="center" justify="center" vertical gap={24}>
        <Controller
          name="oldPassword"
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                Options={leaveOptions}
                size="md"
                placeholder="Please select leave type"
                setValues={onChange}
                values={value}
                title="Junaid"
                titlePosition="top"
              />
            );
          }}
          control={control}
        />
        <Flex gap={12}>
          <Button>Submit</Button>
          <Button onClick={() => navigate(PENDING_LEAVES)} variant="outlined">
            See Pending Leave Status
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ApplyForLeave;
