import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState, useEffect } from "react";

interface Country {
  continent_code: string;
  country_name: string;
  country_iso_code: string;
}

interface ContinentAccordionProps {
  continent: {
    code: string;
    name: string;
  };
  countries: Country[];
  form: any; // form object from useForm
}

const Continents = ({
  continent,
  countries,
  form,
}: ContinentAccordionProps) => {
  const [continentCheckedState, setContinentCheckedState] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const selectedItems = form.getValues("items");
    const anySelected = countries.some((country: Country) =>
      selectedItems.includes(country.country_iso_code),
    );
    setContinentCheckedState((prevState) => ({
      ...prevState,
      [continent.code]: anySelected,
    }));
  }, [countries, form]);

  const handleContinentChange = (checked: boolean, continentCode: string) => {
    const countriesInContinent = countries || [];

    if (checked) {
      // Add all countries in the continent to the selected items
      const countryCodes = countriesInContinent.map(
        (country: Country) => country.country_iso_code,
      );
      form.setValue("items", [...form.getValues("items"), ...countryCodes]);
    } else {
      // Remove all countries in the continent from the selected items
      form.setValue(
        "items",
        form
          .getValues("items")
          .filter(
            (code: any) =>
              !countriesInContinent.some(
                (country: Country) => country.country_iso_code === code,
              ),
          ),
      );
    }

    setContinentCheckedState((prevState) => ({
      ...prevState,
      [continentCode]: checked,
    }));
  };

  const renderAccordionContent = () => {
    return (
      <ScrollArea className="h-60">
        <div>
          <Table id="country-table" className="overflow-hidden rounded-lg">
            <TableBody className="bg-background">
              {countries.length > 0 ? (
                countries.map((country: any) => (
                  <TableRow key={country.country_iso_code}>
                    <TableCell className="w-10">
                      <FormField
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                className="h-6 w-6 rounded"
                                checked={field.value?.includes(
                                  country.country_iso_code,
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        country.country_iso_code,
                                      ])
                                    : field.onChange(
                                        field.value.filter(
                                          (value: string) =>
                                            value !== country.country_iso_code,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>

                            <FormLabel className="text-left text-foreground">
                              {country.country_name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No countries available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    );
  };

  return (
    <Accordion
      key={continent.code}
      type="single"
      collapsible
      className="w-full rounded-lg border bg-background"
    >
      <AccordionItem value={continent.code}>
        <AccordionTrigger className="p-4 text-lg font-bold">
          <div className="flex items-center space-x-3">
            <Checkbox
              className="h-6 w-6 rounded"
              checked={continentCheckedState[continent.code] || false}
              onCheckedChange={(checked: boolean) =>
                handleContinentChange(checked, continent.code)
              }
            />
            <h1 className="text-lg font-bold ">{continent.name}</h1>
          </div>
        </AccordionTrigger>
        <AccordionContent className="max-h-64 p-4 ">
          {renderAccordionContent()}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Continents;
