import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetCountryList } from "@/utils/api/Country/API-countryList";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectedHostname } from "@/redux/slices/CloudserverSlice";
import { Form } from "../ui/form";
import Continents from "./Continents";
import { Loader } from "lucide-react";
import { UpdateCountryList } from "@/utils/api/Country/API-updateCountryList";
import { GetCountrySelected } from "@/utils/api/Country/API-getSelectedCountry";
import { UpdateCountryStatus } from "@/utils/api/Country/API-updateStatus";

const FormSchema = yup.object({
  items: yup
    .array()
    .of(yup.string())
    .min(1, "You must select at least one country."),
});

interface Country {
  continent_code: string;
  country_name: string;
  country_iso_code: string;
}

const Country = () => {
  const hostname = useSelector(selectedHostname);

  // Fetching the list of countries
  const { data: listofCountries } = useQuery({
    queryKey: ["ListofCountries"],
    queryFn: GetCountryList,
  });

  // Fetching the list of selected countries
  const { data: getSelectedCountries } = useQuery({
    queryKey: ["getSelectedCountry"],
    queryFn: () => {
      if (hostname) {
        return GetCountrySelected(hostname);
      }
      return null;
    },
  });
  const form = useForm({
    resolver: yupResolver(FormSchema), // Use yup resolver
    defaultValues: {
      items: [],
    },
  });

  const { data: updateCountriesStatus } = useQuery({
    queryKey: ["UpdateCountryStatus"],
    queryFn: () => {
      if (hostname) {
        return UpdateCountryStatus(hostname);
      }
      return null;
    },
  });

  useEffect(() => {
    if (getSelectedCountries) {
      form.reset({
        items: getSelectedCountries.map((c: any) => c.country_iso_code),
      });
    }
  }, [getSelectedCountries, form]);

  const { mutate } = useMutation({
    mutationFn: (updatedCountries: Country[]) =>
      UpdateCountryList(hostname, updatedCountries),
    onSuccess: (data) => {
      console.log("Selection updated successfully", data);
      toast.success(data);
    },
    onError: (error: any) => {
      console.error("Error updating country list:", error);
      toast.success("Update failed");
    },
  });

  // Handling form submission
  function onSubmit(data: yup.InferType<typeof FormSchema>) {
    const selectedCountries = listofCountries?.filter(
      (country: Country) =>
        data.items?.includes(country.country_iso_code) ?? false,
    );
    mutate(selectedCountries);
  }

  const continents = [
    { code: "NA", name: "North America" },
    { code: "SA", name: "South America" },
    { code: "EU", name: "Europe" },
    { code: "AF", name: "Africa" },
    { code: "AN", name: "Antarctica" },
    { code: "AS", name: "Asia" },
    { code: "OC", name: "Oceania" },
  ];

  // Grouping countries by continent
  const groupedByContinent = listofCountries?.reduce(
    (acc: Record<string, Country[]>, country: Country) => {
      const { continent_code } = country;
      if (!acc[continent_code]) {
        acc[continent_code] = [];
      }
      acc[continent_code].push(country);
      return acc;
    },
    {},
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {continents.map((continent) => (
            <Continents
              key={continent.code}
              continent={continent}
              countries={groupedByContinent?.[continent.code] || []}
              form={form}
            />
          ))}

          <Button type="submit" className="w-full text-lg text-foreground">
            {updateCountriesStatus == 202 ? (
              <Loader className="size-6 animate-spin" />
            ) : (
              <h1>Update</h1>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Country;
