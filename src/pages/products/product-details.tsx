// import { productType } from "@/lib/types/product";
// import { Edit } from "lucide-react";
// import { useLocation } from "react-router-dom";

// export default function ProductStockManagment() {
//   const { state } = useLocation();
//   const product: productType = state;
//   console.log(product, "product detail");

//   return (
//     <main className="flex-1 overflow-y-auto p-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Product images */}
//           <div className="md:w-1/4">
//             <div className="relative mb-4">
//               {/* Single placeholder image */}
//               <img
//                 src="/product-mockup.png"
//                 alt={product?.sku || "Product Image"}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Product details */}
//           <div className="md:w-3/4">
//             <div className="flex justify-between items-center mb-4">
//               {/* Use fields relevant to your new schema */}
//               <h1 className="text-2xl font-bold">
//                 {product?.sku}{" "}
//                 {product?.voltageGrade ? `(${product.voltageGrade})` : ""}
//               </h1>
//               <button className="text-green-600 flex items-center">
//                 <Edit className="w-4 h-4 mr-1" /> Edit
//               </button>
//             </div>

//             {/* If you want an internal ID, you can display it as SKU ID or Inventory ID */}
//             <p className="text-sm text-gray-600 mb-4">
//               SKU ID: {product?.inventoryItemId || "N/A"}
//             </p>

//             {/* Description */}
//             <p className="mb-6 text-sm">
//               {product?.productGroup || "No description available."}
//             </p>

//             {/* Product stats (example placeholders) */}
//             <div className="grid border border-stroke rounded-lg p-4 grid-cols-4 gap-4 mb-6">
//               {[
//                 { label: "PRICE", value: product?.price ?? "0.00" },
//                 { label: "ORDERS", value: "0" },
//                 { label: "AVAILABLE STOCKS", value: product?.quantity ?? "0" },
//                 { label: "TOTAL REVENUE", value: "0.00" },
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   className={`text-center ${
//                     index !== 3 && "border-r border-stroke"
//                   }`}
//                 >
//                   <div className="text-lg font-semibold text-green-600">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs text-gray-500">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Color (if applicable) */}
//             <div className="mb-6">
//               <h3 className="font-semibold mb-2">COLOR</h3>
//               <p className="text-sm">
//                 {product?.productColor
//                   ? product.productColor
//                   : "No color specified"}
//               </p>
//             </div>

//             {/* Product description (long form, if you have it) */}
//             <div className="mb-6">
//               <h3 className="font-semibold mb-2">PRODUCT DESCRIPTION</h3>
//               <p className="text-sm text-gray-600">
//                 {/* This can be your extended marketing description or more details. */}
//                 {product?.description || "No description available."}
//               </p>
//             </div>

//             {/* Additional information (example placeholders) */}
//             <div className="mb-6">
//               <h3 className="font-semibold mb-2">ADDITIONAL INFORMATION</h3>
//               <table className="w-full text-sm bg-[#FAFAFA] rounded-lg">
//                 <tbody>
//                   {[
//                     { label: "PRODUCT", value: product?.sku || "N/A" },
//                     {
//                       label: "ITEM DETAILS",
//                       value: product?.productSubCategory || "N/A",
//                     },
//                     {
//                       label: "COMPOSITION",
//                       value: `Cores: ${product?.productCores || 0} | CSA: ${
//                         product?.productCSA || "N/A"
//                       }`,
//                     },
//                   ].map((item, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="py-2 px-4 text-gray-black font-semibold">
//                         {item.label}
//                       </td>
//                       <td className="py-2">{item.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* 
//               If you have Ratings & Reviews, re-add that here.
//               For now, it’s commented out or removed since it’s not in your new schema.
//             */}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }






import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Package, ChevronDown } from "lucide-react"
import { BaseButton } from "@/components/ui/base-button"
import { useSearchParams } from "react-router-dom"
import ProductService from "@/services/product.service"

export default function StockManagement() {
  const [searchParams]=useSearchParams();
  const inventoryItemId=searchParams.get("inventoryItemId")
  const {useFetchStockBreakdown}=ProductService();
  const {data:breakdownData}=useFetchStockBreakdown(inventoryItemId||"")

  return (
    <div className="flex">
    
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        
        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Total Stock</CardTitle>
                <Package className="h-5 w-5 opacity-70" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{breakdownData?.data?.stockData[0]?.onHandStock}</div>
                <p className="text-sm opacity-70">Across all warehouses</p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Stock Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdownData?.data?.stockBreakUpData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="warehouse" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar dataKey="onHandStock" fill="#FF8548" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Warehouse Breakdown</CardTitle>
              <BaseButton variant="outline" size="sm">
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </BaseButton>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Item ID</TableHead>
                    <TableHead className="text-right">Stock Level</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breakdownData?.data?.stockBreakUpData.map((item) => (
                    <TableRow key={item.warehouse}>
                      <TableCell className="font-medium">{item.warehouse}</TableCell>
                      <TableCell>{item.inventoryItemId}</TableCell>
                      <TableCell className="text-right">{item.onHandStock}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.onHandStock > 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.onHandStock > 100 ? "In Stock" : "Low Stock"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}