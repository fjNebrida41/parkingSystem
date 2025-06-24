import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import SelectInput from "@/Components/SelectInput";
import { VEHICLE_COLOR_CLASS_MAP, VEHICLE_COLOR_TEXT_MAP } from "@/Constant";
import { Link, router } from "@inertiajs/react";

export default function VehiclesTable({ vehicles, queryParams = null }) {

    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("vehicle.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route("vehicle.index"), queryParams);
    };

    const deleteVehicle = (vehicle) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) {
            return;
        }
        router.delete(route('vehicle.destroy', vehicle.id));
    };

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text
                            text-gray-500 dark:text-gray-400">

                    <thead>
                        <tr>
                            <th className="pb-5">
                                <TextInput
                                    className="w-full text-xs"
                                    placeholder="ID"
                                    defaultValue={queryParams.id}
                                    onBlur={(e) => searchFieldChanged('id', e.target.value)}
                                    onKeyPress={(e) => onKeyPress('id', e)}
                                />
                            </th>
                            <th className=""></th>
                            <th className=""></th>
                            <th className="pb-5">
                                <SelectInput
                                    className="w-full text-xs text-gray-700"
                                    defaultValue={queryParams.type}
                                    onChange={(e) => searchFieldChanged('type', e.target.value)
                                    }
                                >
                                    <option value="">Vehicle Type</option>
                                    <option value="bicycle">bicycle</option>
                                    <option value="motorcycle">motorcycle</option>
                                    <option value="e_bike_2s">e_bike_2s</option>
                                    <option value="e_bike_4s">e_bike_4s</option>
                                </SelectInput>
                            </th>
                            <th className=""></th>
                            <th className="pb-5">
                                <SelectInput
                                    className="w-full text-xs text-gray-700"
                                    defaultValue={queryParams.color}
                                    onChange={(e) => searchFieldChanged('color', e.target.value)
                                    }
                                >
                                    <option value="">Color</option>
                                    <option value="red">Red</option>
                                    <option value="orange">Orange</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                    <option value="black">Black</option>
                                    <option value="violet">Violet</option>
                                    <option value="white">White</option>
                                    <option value="silver">Silver</option>
                                    <option value="gray">Gray</option>
                                </SelectInput>
                            </th>
                            <th className=""></th>
                        </tr>
                    </thead>

                    <thead className="text-xs text-gray-700 uppercase
                                    bg-gray-50 dark:bg-gray-700 dark:text-gray-400
                                    border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                {...queryParams}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-3">image</th>
                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Owner's Name
                            </TableHeading>
                            <TableHeading
                                name="type"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Vehicle type
                            </TableHeading>
                            <th className="px-3 py-3">Plate Number</th>
                            <TableHeading
                                name="color"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Color
                            </TableHeading>
                            <th className="px-3 py-3 text-center">Description</th>
                            <th className="px-3 py-3">actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehicles.data.map((vehicle) => (
                            <tr className="bg-white border-b dark:bg-gray-800
                                dark:border-gray-700 dark:hover:bg-gray-700" 
                                key={vehicle.id}
                            >
                                <td className="px-3 py-2 w-10 text-gray-200">{vehicle.id}</td>
                                <td className="px-3 py-2">
                                    <img src={vehicle.image_path} className="w-24 h-24 object-cover rounded-md border"/>
                                </td>
                                <th className="px-3 py-2 text-white uppercase">
                                    <Link
                                        href={route("owner.show", vehicle.owner.id)}
                                        className="hover:underline"
                                    >
                                        {vehicle.owner.name}
                                    </Link>
                                </th>
                                <td className="px-3 py-2 text-gray-200">{vehicle.type}</td>
                                <td className={`text-xs uppercase ${!vehicle.plate_number ? 'text-gray-400 italic text-xs' : 'text-gray-200'}`}>
                                    {vehicle.plate_number || "No plate number provided"}
                                </td>
                                <td className="px-3 py-2">
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            VEHICLE_COLOR_CLASS_MAP[vehicle.color]
                                        }
                                    >
                                        {VEHICLE_COLOR_TEXT_MAP[vehicle.color]}
                                    </span>
                                </td>
                                <td className={`text-xs text-nowrap ${!vehicle.description ? 'text-gray-400 italic text-xs' : 'text-gray-200'}`}>
                                    {vehicle.description || "No description available"}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link
                                        href={route("vehicle.edit", vehicle.id)}
                                        className="font-medium text-blue-600
                                                dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(e) => deleteVehicle(vehicle)}
                                        className="font-medium text-red-600
                                        dark:text-red-500 hover:underline mx-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={vehicles.meta.links} />
        </>
    );
}