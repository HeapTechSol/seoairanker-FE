import Calendar from "@/components/Calendar/Calendar";

const TestPage = () => {


  return (
    <>
   <div className="mt-16 flex flex-col items-center gap-8">
      <Calendar onChange={(val, val2)=>console.log("startDate****", val, "endDate****", val2)}/>
    </div>
    </>
  );
};

export default TestPage;
