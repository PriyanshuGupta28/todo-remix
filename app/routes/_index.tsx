import { useState } from "react";
import { Table, Button, TextField, Flex } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { useFetcher } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Very cool app | Remix" },
    { property: "og:title", content: "Very cool app" },
    { name: "description", content: "This app is the best" },
  ];
};

type User = {
  id: number;
  name: string;
  email: string;
  group: string;
};

const initialData: User[] = [
  {
    id: 1,
    name: "Danilo Sousa",
    email: "danilo@example.com",
    group: "Developer",
  },
  { id: 2, name: "Zahra Ambessa", email: "zahra@example.com", group: "Admin" },
  {
    id: 3,
    name: "Jasper Eriksson",
    email: "jasper@example.com",
    group: "Developer",
  },
];

export default function Index() {
  const [users, setUsers] = useState(initialData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddSubmit = (newUser: Omit<User, "id">) => {
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const userWithId = { id, ...newUser };
    setUsers((prev) => [...prev, userWithId]);
    setIsAddDialogOpen(false);
  };
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const fetcher = useFetcher();

  const handleEditSubmit = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleDelete = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setDeletingUser(null);
  };

  return (
    <Flex className="justify-center items-center">
      <Flex direction={"column"} width={{ initial: "90%", md: "80%" }}>
        <Flex className="flex justify-start mb-4">
          <Button variant="solid" onClick={() => setIsAddDialogOpen(true)}>
            Add User
          </Button>
        </Flex>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="whitespace-nowrap">
                Full name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="whitespace-nowrap">
                Email
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="whitespace-nowrap">
                Group
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="whitespace-nowrap">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell className="whitespace-nowrap">
                  {user.name}
                </Table.RowHeaderCell>
                <Table.Cell className="whitespace-nowrap">
                  {user.email}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {user.group}
                </Table.Cell>
                <Table.Cell className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    onClick={() => setEditingUser(user)}
                    disabled={fetcher.state !== "idle"}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="solid"
                    color="red"
                    onClick={() => setDeletingUser(user)}
                    disabled={fetcher.state !== "idle"}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {/* Edit Dialog */}
        <Dialog.Root
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 shadow-lg">
              <Dialog.Title>Edit User</Dialog.Title>
              <fetcher.Form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedUser: User = {
                    id: editingUser!.id,
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    group: formData.get("group") as string,
                  };
                  handleEditSubmit(updatedUser);
                }}
              >
                <TextField.Root
                  placeholder="Name"
                  name="name"
                  defaultValue={editingUser?.name}
                  required
                />
                <TextField.Root
                  placeholder="Email"
                  name="email"
                  type="email"
                  defaultValue={editingUser?.email}
                  required
                />
                <TextField.Root
                  placeholder="Group"
                  name="group"
                  defaultValue={editingUser?.group}
                  required
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button type="submit" disabled={fetcher.state !== "idle"}>
                    {fetcher.state === "submitting" ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="ghost" onClick={() => setEditingUser(null)}>
                    Cancel
                  </Button>
                </div>
              </fetcher.Form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Delete Dialog */}
        <Dialog.Root
          open={!!deletingUser}
          onOpenChange={() => setDeletingUser(null)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 shadow-lg">
              <Dialog.Title>Confirm Delete</Dialog.Title>
              <p>Are you sure you want to delete {deletingUser?.name}?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="solid"
                  color="red"
                  onClick={() => handleDelete(deletingUser!.id)}
                  disabled={fetcher.state !== "idle"}
                >
                  {fetcher.state === "submitting" ? "Deleting..." : "Delete"}
                </Button>
                <Button variant="ghost" onClick={() => setDeletingUser(null)}>
                  Cancel
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Add Dialog */}
        <Dialog.Root
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          modal
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-inherit rounded-md p-4 shadow-lg">
              <Dialog.Title>Add User</Dialog.Title>
              <fetcher.Form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const newUser = {
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    group: formData.get("group") as string,
                  };
                  handleAddSubmit(newUser);
                }}
                className="flex flex-col gap-5"
              >
                <TextField.Root
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full h-10 px-2 border border-gray-300 rounded-md"
                />
                <TextField.Root
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full h-10 px-2 border border-gray-300 rounded-md"
                />
                <TextField.Root
                  name="group"
                  placeholder="Group"
                  required
                  className="w-full h-10 px-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button type="submit" disabled={fetcher.state !== "idle"}>
                    {fetcher.state === "submitting" ? "Adding..." : "Add"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </fetcher.Form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Flex>
    </Flex>
  );
}
