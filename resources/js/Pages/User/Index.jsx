import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ users, queryParams = null, success }) {
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
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
        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        router.delete(route('user.destroy', user.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded
                        shasow transition-all hover:bg-emerald-800">
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-8">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded pb-2 mb-1">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 pt-3 text-gray-900 dark:text-gray-100">
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
                                            <th className="pb-5">
                                                <TextInput
                                                    className="w-full text-xs"
                                                    placeholder="User's Name"
                                                    defaultValue={queryParams.name}
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={(e) => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className=""></th>
                                            <th className=""></th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase
                                    bg-gray-50 dark:bg-gray-700 dark:text-gray-400
                                    border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                User's Name
                                            </TableHeading>
                                            <TableHeading
                                                name="email"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                User's Email
                                            </TableHeading>
                                            <th className="px-3 py-3 ">actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr className="bg-white border-b dark:bg-gray-800
                                            dark:border-gray-700" key={user.id}
                                            >
                                                <td className="px-3 py-2">{user.id}</td>
                                                <th className="px-3 py-2 text-nowrap text-gray-100">
                                                    {user.name}
                                                </th>
                                                <td className="px-3 py-2 text-gray-100">{user.email}</td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route("user.edit", user.id)}
                                                        className="font-medium text-blue-600
                                                        dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteUser(user)}
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
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}