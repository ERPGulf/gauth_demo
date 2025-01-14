import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "../ui/button";

const Settings = () => {
  return (
    <div className="space-y-3">
      <Accordion
        type="single"
        collapsible
        className="rounded-lg border bg-background"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 text-sm">
            Backup Auto Enrollment
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-4">
            <p className="text-sm font-light">
              This controls whether Linode Backups are enabled, by default, for
              all Linodes when they are initially created. For each Linode with
              Backups enabled, your account will be billed the additional hourly
              rate noted on the Backups pricing page.
            </p>
            <div className="flex items-center space-x-3">
              <ToggleGroup
                type="single"
                size="sm"
                defaultValue="off"
                disabled={true}
              >
                <ToggleGroupItem value="on">ON</ToggleGroupItem>
                <ToggleGroupItem value="off">OFF</ToggleGroupItem>
              </ToggleGroup>
              <p>
                Disabled (Don’t enroll new Linodes in Backups automatically)
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="rounded-lg border bg-background"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 text-sm">
            Network Helper
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-4">
            <p className="text-sm font-light">
              Network Helper automatically deposits a static networking
              configuration into your Linode at boot.
            </p>
            <div className="flex items-center space-x-3">
              <ToggleGroup
                type="single"
                size="sm"
                defaultValue="off"
                disabled={true}
              >
                <ToggleGroupItem value="on">ON</ToggleGroupItem>
                <ToggleGroupItem value="off">OFF</ToggleGroupItem>
              </ToggleGroup>
              <span className="py-2"> Disabled </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="rounded-lg border bg-background"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 text-sm">
            Object Storage
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-4">
            <p className="text-sm font-light">
              Content storage and delivery for unstructured data. Great for
              multimedia, static sites, software delivery, archives, and data
              backups. To get started with Object Storage, create a Bucket or an
              Access Key. Learn more.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className="rounded-lg border bg-background"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 text-sm">
            Linode Managed
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-4">
            <p className="text-sm font-light">
              Linode Managed includes Backups, Longview Pro, cPanel, and
              round-the-clock monitoring to help keep your systems up and
              running. +$100/month per Linode. Learn more.
            </p>
            <Button variant={"secondary"} disabled={true}>
              Add Linode Managed
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Settings;
