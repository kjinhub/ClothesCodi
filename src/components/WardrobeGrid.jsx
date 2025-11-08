import WardrobeCanvas from "../components/WardrobeCanvas";
import sampleWardrobeData from "../data/sampleWardrobeData";

function Wardrobe() {
  return (
    <div className="wardrobe-page">
      <h2>내 옷장</h2>
      <WardrobeCanvas wardrobe={sampleWardrobeData} />
    </div>
  );
}

export default Wardrobe;
