const visionSectionId = "vision-section"
const missionSectionId = "mission-section"
const currentStateSectionId = "current-state-section"
const goalsSectionId = "goals-section"
const methodsSectionId = "methods-section"

const templateTitle = "template-title"
const templateSubtitle = "template-subtitle"
const templateParagraph = "template-paragraph"
const templateBulletList = "template-bulletlist"
const templateTable = "template-table"
const templatePlainList = "template-plainlist"

export const strategy = {
    mission: missionSectionId,
    vision: visionSectionId,
    currentState: currentStateSectionId,
    goals: goalsSectionId,
    methods: methodsSectionId
}
export const strategyIds = Object.values(strategy)

export const template = {
    title: templateTitle,
    subtitle: templateSubtitle,
    paragraph: templateParagraph,
    bulletlist: templateBulletList,
    table: templateTable,
    plainlist: templatePlainList
}
export const templateTypes = Object.values(template)