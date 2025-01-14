import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Footer = () => {
  return (
    <div className="mt-5 border-t pt-5">
      <div className="mx-20 block border-b">
        <div className="grid grid-cols-1 justify-between md:grid-cols-1 lg:grid-cols-2">
          <div className="mb-5 block">
            <div>
              <h2 className="pb-4 text-xl font-extrabold">MUI</h2>
              <h2 className="text-md font-bold">Keep up to date</h2>
              <p className="py-2 text-gray-500">
                Join our newsletter for regular updates. No spam ever.
              </p>
              <p className="text-gray-400">Your email</p>
              <div className="mr-20 flex py-3">
                <Input type="email" placeholder="Email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div>
              <h3 className="font-bold">Product</h3>
              <p className="text-gray-500">Material UI</p>
              <p className="text-gray-500">Base UI</p>
              <p className="text-gray-500">MUI X</p>
              <p className="text-gray-500">Templates</p>
              <p className="text-gray-500">MUI Toolpad</p>
              <p className="text-gray-500">Design kits</p>
            </div>
            <div>
              <h3 className="font-bold">Resources</h3>
              <p className="text-gray-500">Material UI</p>
              <p className="text-gray-500">Fress templates</p>
              <p className="text-gray-500">Components</p>
              <p className="text-gray-500">Customization</p>
              <p className="text-gray-500">Theming</p>
            </div>
            <div>
              <h3 className="font-bold">Explore</h3>
              <p className="text-gray-500">Documentation</p>
              <p className="text-gray-500">Store</p>
              <p className="text-gray-500">Blog</p>
              <p className="text-gray-500">Showcase</p>
              <p className="text-gray-500">Roadmap</p>
            </div>
            <div>
              <h3 className="font-bold">Company</h3>
              <p className="text-gray-500">About</p>
              <p className="text-gray-500">Vision</p>
              <p className="text-gray-500">Careers</p>
              <p className="text-gray-500">Support</p>
              <p className="text-gray-500">Privacy policy</p>
              <p className="text-gray-500">Contact us</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t py-5">
          <div>
            <p>Copyright © 2024 Material UI SAS, trading as MUI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
