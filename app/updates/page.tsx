import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MarketUpdates } from "@/components/market-updates";

export default function UpdatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight"></h2>
        </div>
        <div className="grid gap-4">
          <MarketUpdates />
        </div>
      </main>
      <Footer />
    </div>
  );
}
