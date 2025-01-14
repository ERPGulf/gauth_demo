import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mails, MapPin, Phone, Send } from "lucide-react";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("First Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-10 my-2 flex w-full flex-col justify-center space-x-10  space-y-1 text-center">
      <h1 className="text-5xl font-medium">Contact our team</h1>
      <p className="text-sm text-muted-foreground">
        Got any questions regarding our product or scaling in our platform?
        We're to help.
        <br /> Chat to our friendly team of experts today.
      </p>

      <div className="grid grid-cols-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex flex-col space-y-3 rounded-xl border bg-gray-50 px-4 py-8  text-left dark:bg-background"
        >
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" placeholder="John" {...register("name")} />
          <p className="text-xs text-red-500">{errors.name?.message}</p>
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="text" placeholder="1234567890" {...register("phone")} />
          <p className="text-xs text-red-500">{errors.phone?.message}</p>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="you@company.com"
            {...register("email")}
          />
          <p className="text-xs text-red-500">{errors.email?.message}</p>
          <Label htmlFor="message">Message</Label>
          <Textarea
            placeholder="Leave us a message.."
            {...register("message")}
          />
          <p className="text-xs text-red-500">{errors.message?.message}</p>
          <Button type="submit">Send Message</Button>
        </form>

        <div className="ml-20 text-left">
          <div className="flex w-1/2 flex-col ">
            <h2 className="mt-12 text-lg font-medium">Chat with us</h2>
            <p className="text-xs text-muted-foreground">
              Speak to our friendly team via live chat
            </p>
            <Button variant={"outline"} className="mt-2">
              <Send className="mr-2 size-5" />
              Chat now
            </Button>
            <Button variant={"outline"} className="mt-1">
              <Mails className="mr-2 size-5" /> Shoot us an Email
            </Button>
          </div>

          <div className="flex w-1/2 flex-col ">
            <h2 className="mt-10 text-lg font-medium">Call us</h2>
            <p className="text-xs text-muted-foreground">
              Call our team Mon-Fri from 8am to 5pm
            </p>
            <Button variant={"outline"} className="mt-2">
              <Phone className="mr-2 size-5" /> +1234567890
            </Button>
          </div>

          <div className="flex w-1/2 flex-col ">
            <h2 className="mt-10 text-lg font-medium">Visit us</h2>
            <p className="text-xs text-muted-foreground">
              Drop by our office for in person support
            </p>
            <Button variant={"outline"} className="mt-2">
              <MapPin className="mr-2 size-5" />
              Doha,Qatar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
