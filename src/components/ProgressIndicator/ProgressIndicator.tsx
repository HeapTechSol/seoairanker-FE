import "./ProgressIndicator.scss";

const ProgressIndicator = ({
  max = 100,
  value = 50,
}: {
  max: number;
  value: number;
}) => {
  return (
    <div className="progress-section" data-aos="fade-left" data-aos-once="true">
      <progress className="progress progress3" max={max} value={value}></progress>
    </div>
  );
};

export default ProgressIndicator;
