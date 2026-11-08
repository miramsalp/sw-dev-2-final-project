"use client";

import { useFetch } from "@/hooks/useFetch";
import type { Facility } from "./types";

export const useFacilities = () => useFetch<Facility[]>("/facilities");
