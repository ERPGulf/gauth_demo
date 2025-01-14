import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const data = [
  {
    title: "How to create a new server instance with the CLI?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "What is the difference between a server and a droplet?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "How to onboard a new team member to the platform?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "How to onboard a new team member to the platform?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "How to create a new server instance with the CLI?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "How do I get started?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    title: "How do I get started?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
];

const HelpAndSupport = () => {
  return (
    <div className="mx-10 my-2 flex w-full flex-col justify-center space-x-10  space-y-1 text-center">
      <h1 className="text-5xl font-medium">Frequently Asked Question</h1>
      <p className="text-sm text-muted-foreground">
        Need help? Check out our FAQ section to see if we have the answer to
        your question.
      </p>

      <div>
        <Accordion type="single" collapsible className="mt-10 w-full text-xl ">
          {data.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                {index + 1}) {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
              <hr className="my-2" />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default HelpAndSupport;
