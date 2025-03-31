"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, School, GraduationCap } from "lucide-react"

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("jhs")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Education Levels</h1>
        <p className="text-muted-foreground">Manage settings for JHS and SHS levels</p>
      </div>

      <Tabs defaultValue="jhs" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="jhs" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            JHS
          </TabsTrigger>
          <TabsTrigger value="shs" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            SHS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jhs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Junior High School</CardTitle>
                  <CardDescription>Configure JHS level settings and subjects</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable JHS Level</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to access JHS content
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Default Time Limit (minutes)</Label>
                  <Input type="number" defaultValue="30" className="w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Label>Questions per Quiz</Label>
                  <Input type="number" defaultValue="10" className="w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input type="number" defaultValue="70" className="w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Subjects</CardTitle>
              <CardDescription>Manage subjects available for JHS level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Mathematics</Label>
                    <p className="text-sm text-muted-foreground">Basic mathematics and algebra</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Science</Label>
                    <p className="text-sm text-muted-foreground">General science and physics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">English</Label>
                    <p className="text-sm text-muted-foreground">Grammar and literature</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Social Studies</Label>
                    <p className="text-sm text-muted-foreground">History and geography</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Senior High School</CardTitle>
                  <CardDescription>Configure SHS level settings and subjects</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SHS Level</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to access SHS content
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Default Time Limit (minutes)</Label>
                  <Input type="number" defaultValue="45" className="w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Label>Questions per Quiz</Label>
                  <Input type="number" defaultValue="15" className="w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input type="number" defaultValue="75" className="w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Subjects</CardTitle>
              <CardDescription>Manage subjects available for SHS level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Advanced Mathematics</Label>
                    <p className="text-sm text-muted-foreground">Calculus and statistics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Physics</Label>
                    <p className="text-sm text-muted-foreground">Advanced physics concepts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Chemistry</Label>
                    <p className="text-sm text-muted-foreground">Organic and inorganic chemistry</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Biology</Label>
                    <p className="text-sm text-muted-foreground">Cell biology and genetics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">English Literature</Label>
                    <p className="text-sm text-muted-foreground">Advanced literature analysis</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
} 