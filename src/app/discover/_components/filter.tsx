"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type TagList, tagIcon, tagList, type Tag } from "@/utils/icon-mapping";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { type filters } from "../types";

const formSchema = z.object({
  interests: z.array(z.string()),
  rating: z.number(),
  gender: z.string(),
  age: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

const defaultValues = {
  interests: new Array<string>(),
  rating: 0,
  gender: "-",
  age: { min: 0, max: 99 },
};

type FilterProps = {
  setFilters: (filters: filters) => void;
};

export default function Filter(props: FilterProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <FilterButton />
      </DialogTrigger>
      <DialogFilter {...props} />
    </Dialog>
  );
}

function FilterButton() {
  return (
    <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary-500 p-2">
      <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-white" />
    </div>
  );
}

function DialogFilter(props: FilterProps) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const values = watch();

  const formSubmit = (filters: filters) => {
    props.setFilters(filters);
  };

  return (
    <DialogContent className="flex-col gap-8 bg-white p-6 md:flex md:min-w-[522px]">
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <FontAwesomeIcon
                icon={faFilter}
                className="h-5 w-5 self-center text-secondary-400"
              />
              <div className="h4 font-bold ">Filter</div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="h5 text-medium">Interest</div>
              <div
                className="h6 text-primary-700 hover:cursor-pointer"
                onClick={() => {
                  setValue("interests", []);
                  setValue("rating", 0);
                  setValue("age", { min: 0, max: 99 });
                  setValue("gender", "-");
                }}
              >
                Remove All
              </div>
            </div>
            <FormField
              control={methods.control}
              name="interests"
              render={({ field }) => (
                <ToggleGroup
                  type="multiple"
                  className="flex flex-row flex-wrap items-center justify-start gap-2 self-stretch"
                  onValueChange={(value: TagList) => {
                    setValue("interests", value);
                  }}
                  {...field}
                  value={values.interests}
                >
                  {tagList.sort().map((tag: Tag) => (
                    <ToggleGroupItem
                      key={tag}
                      variant="outline"
                      icon={tagIcon[tag]}
                      size="md"
                      value={tag}
                    >
                      {tag}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="h5 text-medium">Rating</div>
                <Select
                  name="rating"
                  onValueChange={(value: string) => {
                    setValue("rating", parseInt(value));
                  }}
                  value={values.rating.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="5">5 Only</SelectItem>
                      <SelectItem value="4">More than 4</SelectItem>
                      <SelectItem value="3">More than 3</SelectItem>
                      <SelectItem value="2">More than 2</SelectItem>
                      <SelectItem value="1">More than 1</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h5 text-medium">Gender</div>
                <Select
                  name="gender"
                  onValueChange={(value: string) => {
                    setValue("gender", value);
                  }}
                  value={values.gender}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="-">Any</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="NotToSay">
                        Not Prefer to Say
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h5 text-medium">Age</div>
              <div className="flex flex-row items-center gap-2">
                <Input
                  type="number"
                  className="rounded-3xl"
                  placeholder="Min"
                  min={0}
                  max={99}
                  size="sm"
                  onChange={(e) => {
                    if (parseInt(e.target.value) > values.age.max) {
                      setValue("age.max", parseInt(e.target.value));
                    }
                    setValue("age.min", parseInt(e.target.value));
                  }}
                  value={values.age.min}
                />
                <div className="body6 text-medium">To</div>
                <Input
                  type="number"
                  className="rounded-3xl"
                  placeholder="Max"
                  min={values.age.min}
                  max={99}
                  size="sm"
                  onChange={(e) => {
                    if (parseInt(e.target.value) < values.age.min) {
                      setValue("age.min", parseInt(e.target.value));
                    }
                    setValue("age.max", parseInt(e.target.value));
                  }}
                  value={values.age.max}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-40 self-end">
            Apply
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
