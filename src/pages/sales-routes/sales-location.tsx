import SalesPersonList from '@/components/modules/sales-route-location/sales-person-list';
import SalesPersonLocation from '@/components/modules/sales-route-location/sales-person-location';

function SalesLocation() {
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-lg shadow-sm px-4 py-6">
                <h2 className="text-lg font-semibold mb-4">Sales person location</h2>
                <SalesPersonLocation />
            </div>
            <div>
                <SalesPersonList />
            </div>
        </div>
    );
}

export default SalesLocation;