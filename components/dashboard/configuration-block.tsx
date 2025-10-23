"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, BarChart3 } from "lucide-react";

interface ConfigurationBlockProps {
  jwtToken: string;
  setJwtToken: (token: string) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  analyzeButtonText?: string;
  analyzeButtonIcon?: React.ReactNode;
  loadingProgress?: { current: number; total: number };
}

export function ConfigurationBlock({
  jwtToken,
  setJwtToken,
  baseUrl,
  setBaseUrl,
  onAnalyze,
  loading,
  analyzeButtonText = "Analyze",
  analyzeButtonIcon = <BarChart3 className="h-4 w-4 mr-2" />,
  loadingProgress,
}: ConfigurationBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Configuration
        </CardTitle>
        <CardDescription>
          Configure the analysis parameters for your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Select value={baseUrl} onValueChange={setBaseUrl}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api.yourcall.ai">api.yourcall.ai</SelectItem>
                <SelectItem value="api.dev.yourcall.ai">
                  api.dev.yourcall.ai
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jwtToken">JWT Token</Label>
            <Input
              id="jwtToken"
              type="password"
              placeholder="Your JWT Token"
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
            />
          </div>
        </div>

        {/* Affichage du progrès de chargement */}
        {loading && loadingProgress && loadingProgress.total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Chargement de la data...</span>
              <span>
                {loadingProgress.current} / {loadingProgress.total}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (loadingProgress.current / loadingProgress.total) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={onAnalyze} disabled={!jwtToken || loading} size="lg">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              analyzeButtonIcon
            )}
            {analyzeButtonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
