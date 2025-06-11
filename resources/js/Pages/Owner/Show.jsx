import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import VehiclesShow from "../Vehicle/VehiclesShow";

export default function Show({ owner, vehicles }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {`Owner "${owner.name}"`}
                    </h2>
                    {(!vehicles || vehicles.data.length === 0) ? (
                        <Link
                            href={route("vehicle.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-800"
                        >
                            Add Vehicle
                        </Link>
                    ) : (
                        <Link
                            href={route("owner.index")}
                            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-800"
                        >
                            Back
                        </Link>
                    )}
                </div>
            }
        >
            <Head title={`Owner "${owner.name}"`} />
            <div className="flex gap-90">
                <div className="py-8">
                    <div className="w-[500px] ml-24 pr-1">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 mr-64 text-gray-900 dark:text-gray-100">
                                <div>
                                    <img
                                        src={owner.image_path}
                                        className="w-56 h-56 object-cover rounded-md"
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                </div>

                                {/* Modal */}
                                {isModalOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                        <div className="relative">
                                            <button
                                                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                ✕
                                            </button>
                                            <img
                                                src={owner.image_path}
                                                className="max-w-[90vw] max-h-[90vh] object-contain"
                                                alt="Large"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Owner Info */}
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Owner ID</label>
                                            <p className="mt-1 text-sm">{owner.id}</p>
                                        </div>
                                        <div className="mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Time In</label>
                                            <p className="mt-1 text-sm">{owner.time_in}</p>
                                        </div>
                                        <div className="mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Time Out</label>
                                            <p className="mt-1 text-sm">{owner.time_out}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="ml-40 text-nowrap">
                                            <label className="font-bold text-lg ">Created At</label>
                                            <p className="mt-1 text-sm">{owner.created_at}</p>
                                        </div>
                                        <div className="ml-40 mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Created By</label>
                                            <p className="mt-1 text-sm">{owner.createdBy.name}</p>
                                        </div>
                                        <div className="ml-40 mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Updated By</label>
                                            <p className="mt-1 text-sm">{owner.updatedBy.name}</p>
                                        </div>
                                        <div className="ml-40 mt-4 text-nowrap">
                                            <Link
                                                href={route("owner.edit", owner.id)}
                                                className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-800"
                                            >
                                                Edit Owner
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle info */}
                <div className="py-8 mr-24 pl-1">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                                <VehiclesShow vehicles={vehicles} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
