"use client"

import { useEffect, useRef, useState } from "react"
import { getLevel, getSchool } from "@/components/groups/constants"
import { getCoursesForLevel } from "@/queries/groups"
import type { MissingGroupLinkReportInput } from "@/queries/types"
import { courseLabel, humanizeSlug, levelLabel, schoolLabel } from "@/utils/labels"
import { CategoryStep } from "./category-step"
import { CourseStep } from "./course-step"
import { DetailsStep } from "./details-step"
import { LevelStep } from "./level-step"
import { SchoolStep } from "./school-step"
import type { ReportMissingLinkCategory, ReportMissingLinkSelection, ReportMissingLinkStep } from "./types"

export function ReportMissingLinkFlow({
  onBack,
  onSubmit,
  status,
}: {
  onBack: () => void
  onSubmit: (report: MissingGroupLinkReportInput) => void
  status: "idle" | "submitting" | "error"
}) {
  const [step, setStep] = useState<ReportMissingLinkStep>("category")
  const [category, setCategory] = useState<ReportMissingLinkCategory | null>(null)
  const [selection, setSelection] = useState<ReportMissingLinkSelection>({ school: null, level: null, course: null })
  const [courses, setCourses] = useState<string[] | null>(null)
  const [details, setDetails] = useState("")
  const [detailsFrom, setDetailsFrom] = useState<ReportMissingLinkStep | null>(null)
  const courseRequest = useRef(0)

  useEffect(() => {
    if (!selection.school || !selection.level) return

    const request = ++courseRequest.current
    setCourses(null)
    void getCoursesForLevel(selection.school, selection.level)
      .then((result) => {
        if (request === courseRequest.current) setCourses(result)
      })
      .catch(() => {
        if (request === courseRequest.current) setCourses([])
      })
  }, [selection.level, selection.school])

  const school = selection.school ? getSchool(selection.school) : undefined
  const level = selection.school && selection.level ? getLevel(selection.school, selection.level) : undefined
  const path =
    category === "extra"
      ? "Gruppi Extra"
      : [school?.name, level?.name, selection.course ? humanizeSlug(selection.course) : undefined]
          .filter(Boolean)
          .join(" · ")

  function selectCategory(next: ReportMissingLinkCategory) {
    setCategory(next)
    setSelection({ school: null, level: null, course: null })
    if (next === "extra") {
      setDetailsFrom("category")
      setStep("details")
    } else {
      setStep("school")
    }
  }

  function selectSchool(schoolSlug: string) {
    setSelection({ school: schoolSlug, level: null, course: null })
    setStep("level")
  }

  function selectLevel(levelSlug: string) {
    setSelection((current) => ({ ...current, level: levelSlug, course: null }))
    setStep("course")
  }

  function selectCourse(course: string) {
    setSelection((current) => ({ ...current, course }))
    setDetailsFrom("course")
    setStep("details")
  }

  function specifyMissing(from: ReportMissingLinkStep) {
    setDetailsFrom(from)
    setStep("details")
  }

  function goBack() {
    if (step === "category") {
      onBack()
      return
    }

    if (step === "school") {
      setSelection({ school: null, level: null, course: null })
      setStep("category")
      return
    }

    if (step === "level") {
      setSelection({ school: null, level: null, course: null })
      setStep("school")
      return
    }

    if (step === "course") {
      setSelection((current) => ({ ...current, level: null, course: null }))
      setStep("level")
      return
    }

    // step === "details"
    setStep(detailsFrom ?? "category")
  }

  function submit() {
    if (!details.trim() || status === "submitting") return

    const label =
      category === "extra"
        ? "Gruppi Extra"
        : selection.school && selection.course && selection.level
          ? courseLabel(selection.school, selection.level, selection.course)
          : selection.school && selection.level
            ? levelLabel(selection.school, selection.level)
            : selection.school
              ? schoolLabel(selection.school)
              : null

    if (label === null) return

    onSubmit({
      reportType: "missing",
      label,
      details: details.trim(),
    })
  }

  if (step === "category") {
    return <CategoryStep onBack={goBack} onSelect={selectCategory} />
  }

  if (step === "school") {
    return <SchoolStep onBack={goBack} onSelect={selectSchool} />
  }

  if (step === "level" && selection.school) {
    return (
      <LevelStep
        schoolName={school?.name}
        schoolSlug={selection.school}
        onBack={goBack}
        onSelectLevel={selectLevel}
        onSpecifyMissing={() => specifyMissing("level")}
      />
    )
  }

  if (step === "course" && selection.school && selection.level) {
    return (
      <CourseStep
        path={path}
        courses={courses}
        onBack={goBack}
        onSelectCourse={selectCourse}
        onSpecifyMissing={() => specifyMissing("course")}
      />
    )
  }

  return (
    <DetailsStep
      path={path}
      category={category}
      details={details}
      status={status}
      onBack={goBack}
      onChangeDetails={setDetails}
      onSubmit={submit}
    />
  )
}
