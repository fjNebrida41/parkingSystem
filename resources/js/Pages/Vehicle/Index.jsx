import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import VehiclesTable from "./VehiclesTable";

export default function Index({ vehicles, queryParams = null, success }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Vehicles
                </h2>
            }
        >
            <Head title="Vehicles"/>

            <div className="py-8">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded pb-2 mb-1">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 pt-3 text-gray-900 dark:text-gray-100">
                            <VehiclesTable vehicles={vehicles} queryParams={queryParams} success={success}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}