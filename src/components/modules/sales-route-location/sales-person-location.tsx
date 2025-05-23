import { SalesPersonListProps } from "@/lib/types/pjp";
import {
  GoogleMap,
  LoadScript,
  Circle,
  Marker,
  MarkerF,
} from "@react-google-maps/api";

const center = {
  lat: 24.8686,
  lng: 67.3639,
};
// const Points = [{ lat: 24.7886, lng: 67.23639 }];
const SalesPersonLocation = ({ data }: SalesPersonListProps) => {
  console.log("SalesPersonLocation", data);
  const Points = data
    ?.map((item) => {
      const lat = parseFloat(item.customer.latitude);
      const lng = parseFloat(item.customer.longitude);
      if (isNaN(lat) || isNaN(lng)) return null;
      return { lat, lng };
    })
    .filter(Boolean); // remove any invalid entries
  console.log("Points", Points);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerClassName="w-full h-[600px] rounded-lg"
        center={center}
        zoom={5}
      >
        {Points?.map((point, index) => (
          <>
            {" "}
            <MarkerF
              position={point}
              icon={{
                url: "/location-image.png",
              }}
              label={{
                text: String.fromCharCode(65 + index), // 65 = 'A', 66 = 'B', 67 = 'C'
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            ></MarkerF>
          </>
        ))}

        <Circle
          center={center}
          radius={1000}
          options={{
            strokeColor: "#008444",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#008444",
            fillOpacity: 0.2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default SalesPersonLocation;
// import { SalesPersonListProps } from "@/lib/types/pjp";
// import { GoogleMap, LoadScript, Circle, MarkerF } from "@react-google-maps/api";

// const center = {
//   lat: 24.8686,
//   lng: 67.3639,
// };

// const SalesPersonLocation = ({ data }: SalesPersonListProps) => {
//   console.log("SalesPersonLocation", data);

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
//       <GoogleMap
//         mapContainerClassName="w-full h-[600px] rounded-lg"
//         center={center}
//         zoom={10}
//       >
//         {data?.map((item, index) => {
//           const lat = parseFloat(item.customer.latitude);
//           const lng = parseFloat(item.customer.longitude);

//           // Skip if lat/lng is not a valid number
//           if (isNaN(lat) || isNaN(lng)) return null;

//           return (
//             <MarkerF
//               key={item.customer.id || index}
//               position={{ lat, lng }}
//               icon={{ url: "/location-image.png" }}
//               label={{
//                 text: String.fromCharCode(65 + index), // A, B, C...
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: "15px",
//               }}
//             />
//           );
//         })}

//         <Circle
//           center={center}
//           radius={1000}
//           options={{
//             strokeColor: "#008444",
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: "#008444",
//             fillOpacity: 0.2,
//           }}
//         />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default SalesPersonLocation;
