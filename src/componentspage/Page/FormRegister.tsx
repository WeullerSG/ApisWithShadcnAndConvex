import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    zipCode: "",
    street: "",
    num: "",
    city: "",
    uf: "",
  });

  const createUser = useMutation(api.users.create);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.userName) {
      alert("Name and Username are required!");
      return;
    }

    try {
      await createUser(formData); // envia todos os dados
      alert("User created successfully!");
      setFormData({
        name: "",
        userName: "",
        zipCode: "",
        street: "",
        num: "",
        city: "",
        uf: "",
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-blue-500 text-white">
            Register User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Register User</DialogTitle>
              <DialogDescription>
                Fill in the details to register a new user.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              {/* Name */}
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="grid gap-3">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              {/* Zip Code */}
              <div className="grid gap-3">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>

              {/* Street */}
              <div className="grid gap-3">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              {/* Number */}
              <div className="grid gap-3">
                <Label htmlFor="num">Number</Label>
                <Input
                  id="num"
                  name="num"
                  value={formData.num}
                  onChange={handleChange}
                />
              </div>

              {/* City */}
              <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              {/* UF */}
              <div className="grid gap-3">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="bg-blue-500 text-white">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
