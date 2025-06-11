import { useState } from "react";
import { Link } from "@inertiajs/react";
import { VEHICLE_COLOR_CLASS_MAP, VEHICLE_COLOR_TEXT_MAP } from "@/Constant";

export default function VehiclesShow({ vehicles }) {
    const [modalImage, setModalImage] = useState(null); // holds the image path if modal is open

    return (
        <div>
            {vehicles.data.map((vehicle) => (
                <div key={vehicle.id}>
                    <div>
                        <img
                            src={vehicle.image_path}
                            className="w-56 h-56 object-cover rounded-md"
                            onClick={() => setModalImage(vehicle.image_path)}
                        />
                    </div>

                    <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                            <div>
                                <label className="font-bold text-lg">Type</label>
                                <p className="mt-1 text-sm">{vehicle.type}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Color</label>
                                <p
                                    className={
                                        "mt-1 px-2 py-1 rounded text-center text-white " +
                                        VEHICLE_COLOR_CLASS_MAP[vehicle.color]
                                    }
                                >
                                    {VEHICLE_COLOR_TEXT_MAP[vehicle.color]}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="ml-5">
                                <label className="font-bold text-lg text-nowrap">Vehicle Plate Number</label>
                                <p className={`mt-1 uppercase text-sm ${!vehicle.plate_number ? 'text-gray-400 italic' : ''}`}>
                                    {vehicle.plate_number || "No plate number provided"}
                                </p>
                            </div>

                            <div className="ml-5 mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p className={`mt-1 text-nowrap text-sm ${!vehicle.description ? 'text-gray-400 italic' : ''}`}>
                                    {vehicle.description || "No description available"}
                                </p>
                            </div>

                            <div className="ml-5 mt-4">
                                <Link
                                    href={route("vehicle.edit", vehicle.id)}
                                    className="text-nowrap bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-800"
                                >
                                    Edit Vehicle
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal for Enlarged Vehicle Image */}
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={() => setModalImage(null)}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full"
                            onClick={() => setModalImage(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={modalImage}
                            className="max-w-[90vw] max-h-[90vh] object-contain"
                            alt="Enlarged Vehicle"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
