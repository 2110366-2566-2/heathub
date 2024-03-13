"use client";
import { Input } from "@/components/ui/input";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  type TagList,
  tagStyle,
  tagList,
  type Tag,
} from "@/utils/icon-mapping";
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
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Search from "./search";
import { cn } from "@/utils/tailwind-merge";

const formSchema = z.object({
  searchQuery: z.string(),
  interests: z.array(z.string()),
  rating: z.number(),
  gender: z.string(),
  age: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

const defaultValues = {
  searchQuery: "",
  interests: new Array<string>(),
  rating: 0,
  gender: "-",
  age: { min: 0, max: 99 },
};

type FilterProps = {
  setFilters: (filters: filters) => void;
};

export default function Filter(props: FilterProps) {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const values = watch();

  const formSubmit = (filters: filters) => {
    props.setFilters(filters);
  };

  const InterestFilter = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="h5 text-medium">Interests</div>
        <div
          className="h6 text-primary-700 hover:cursor-pointer hover:underline"
          onClick={() => {
            setValue("interests", []);
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
                icon={tagStyle[tag].icon}
                size="md"
                value={tag}
                className="bg-white"
              >
                {tag}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      />
    </div>
  );

  const RatingFilter = (
    <div className="flex w-full flex-col gap-2">
      <div className="h5 text-medium">Rating</div>
      <Select
        name="rating"
        onValueChange={(value: string) => {
          setValue("rating", parseInt(value));
        }}
      >
        <SelectTrigger
          className={cn("w-full", "border-none", isMobile && "bg-neutral-100")}
        >
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All</SelectItem>
          <SelectItem value="5">5 Only</SelectItem>
          <SelectItem value="4">More than 4</SelectItem>
          <SelectItem value="3">More than 3</SelectItem>
          <SelectItem value="2">More than 2</SelectItem>
          <SelectItem value="1">More than 1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const GenderFilter = (
    <div className="flex w-full flex-col gap-2">
      <div className="h5 text-medium">Gender</div>
      <Select
        name="gender"
        onValueChange={(value: string) => {
          setValue("gender", value);
        }}
      >
        <SelectTrigger
          className={cn("w-full", "border-none", isMobile && "bg-neutral-100")}
        >
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-">All</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="NotToSay">Not Prefer to Say</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  const AgeFilter = (
    <div className="flex w-full flex-col justify-between gap-2">
      <div className="h5 text-medium">Age</div>
      <div className="flex flex-row items-center gap-2">
        <Input
          type="number"
          className={cn(
            "rounded-3xl border-none",
            isMobile && "bg-neutral-100",
          )}
          placeholder="Min"
          min={0}
          max={99}
          size="sm"
          onChange={(e) => {
            if (parseInt(e.target.value)) {
              if (parseInt(e.target.value) > values.age.max) {
                setValue("age.max", parseInt(e.target.value));
              }
              setValue("age.min", parseInt(e.target.value));
            } else {
              setValue("age.min", 0);
            }
          }}
        />
        <div className="body6 text-medium">To</div>
        <Input
          type="number"
          className={cn(
            "rounded-3xl border-none",
            isMobile && "bg-neutral-100",
          )}
          placeholder="Max"
          min={values.age.min}
          max={99}
          size="sm"
          onChange={(e) => {
            if (parseInt(e.target.value)) {
              if (parseInt(e.target.value) < values.age.min) {
                setValue("age.min", parseInt(e.target.value));
              }
              setValue("age.max", parseInt(e.target.value));
            } else {
              setValue("age.max", 99);
            }
          }}
        />
      </div>
    </div>
  );

  const AllFilters = (
    <div className="flex flex-col gap-4">
      {InterestFilter}
      <div className="flex flex-row gap-4">
        {RatingFilter}
        {GenderFilter}
        {AgeFilter}
        <div className="flex w-1/5 items-end">
          <Button
            type="submit"
            className="flex rounded-full"
            onClick={() => {
              console.log(watch());
            }}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );

  const AllFiltersMobile = (
    <div className="flex flex-col gap-4">
      {InterestFilter}
      <div className="flex flex-row gap-4">
        {RatingFilter}
        {GenderFilter}
      </div>
      {AgeFilter}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <FilterButton />
        </DrawerTrigger>
        <DrawerContent className="h-[90%] flex-col gap-8 bg-white p-4">
          <Search setValues={setValue} />
          <Form {...methods}>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="flex w-full flex-col gap-4"
            >
              {AllFiltersMobile}
              <DrawerClose
                type="submit"
                className="border-t-1 absolute bottom-0 mb-20 w-full self-center border border-b-0  border-solid border-neutral-200 p-4"
              >
                <Button className="w-full" size="lg">
                  Apply Filters
                </Button>
              </DrawerClose>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex w-full flex-col gap-4 border-b border-solid border-neutral-300 pb-4"
      >
        <Search setValues={setValue} />
        {AllFilters}
      </form>
    </Form>
  );
}

function FilterButton() {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-primary-500 p-2">
      <FontAwesomeIcon
        icon={isMobile ? faSearch : faFilter}
        className="text-white"
        size="lg"
      />
    </div>
  );
}
