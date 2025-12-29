// Configurable scoring weights for the scope generator
// Edit these to adjust how scores are calculated

export const dataScoreWeights = {
    catalogBasic: { yes: 1 },
    descriptionsQuality: { rich: 2, basic: 1, sparse: 0 },
    attributesExist: {
        yes: {
            search_ready: 2,
            mixed: 1,
            garbage: 0.5
        }
    },
    facetsReady: { yes: 1.5, partial: 0.75 },
    relationshipsExist: { yes: 1, partial: 0.5 },
    behavioralData: { comprehensive: 1, some: 0.5 },
    transactionalData: { yes: 0.5 },
    userData: { yes: 0.5 },
    aiBoost: 2,  // Added when AI enrichment is available
    maxScore: 10
}

export const consultationWeights = {
    dataProblemAwareness: { unknown: 3, some_idea: 1.5 },
    pastExperience: { none: 2, some: 1 },
    searchConceptComfort: { need_training: 2, need_basics: 1 },
    wantsOngoingConsultation: { yes: 1.5, maybe: 0.5 },
    payLaterPenalty: 1,  // Added when using pay_later approach
    maxScore: 10
}

export const capacityWeights = {
    teamOwnership: { dedicated: 2, shared: 1 },
    teamRole: { developer: 1.5, merchandiser: 1, product_manager: 0.75 },
    opsAnalytics: { weekly: 1, monthly: 0.5 },
    opsFeedback: { active: 1, adhoc: 0.5 },
    opsQueryTuning: { regular: 1, occasional: 0.5 },
    opsABTesting: { yes: 1, interested: 0.25 },
    opsContentUpdates: { quickly: 1, eventually: 0.5 },
    maxScore: 10
}

export const supportTierThresholds = [
    { min: 0, max: 3, tier: 4, name: 'Managed Service', desc: 'We operate search for them', color: 'purple' },
    { min: 3, max: 5, tier: 3, name: 'Partnership', desc: 'Monthly check-ins, we assist', color: 'blue' },
    { min: 5, max: 7, tier: 2, name: 'Guided', desc: 'Training + documentation', color: 'cyan' },
    { min: 7, max: 10, tier: 1, name: 'Self-Service', desc: 'Standard support', color: 'green' }
]

export const consultationTierThresholds = [
    { min: 6, level: 'High', desc: 'Significant discovery & training needed', color: 'red' },
    { min: 3, level: 'Medium', desc: 'Some training and guidance needed', color: 'yellow' },
    { min: 0, level: 'Low', desc: 'Client is self-sufficient', color: 'green' }
]

export const investmentAdjustmentRules = [
    { condition: (data, feature) => data < 4 && feature.typicalInvestment === 'PREMIUM', newLevel: 'POLISHED' },
    { condition: (data, feature) => data < 5 && feature.typicalInvestment === 'POLISHED' && feature.pillars.data === 'red', newLevel: 'STANDARD' },
    { condition: (capacity, feature) => capacity < 4 && feature.typicalInvestment === 'STANDARD', newLevel: 'POLISHED' },
    { condition: (capacity, feature) => capacity < 3 && feature.typicalInvestment === 'MVP', newLevel: 'STANDARD' }
]

export const priorityBucketMapping = {
    findability: ['core'],
    understanding: ['smart'],
    crosssell: ['discovery'],
    reordering: [], // Handled by feature ID check
    control: ['merchandising'],
    visibility: ['analytics'],
    deadends: ['recovery']
}

export const reorderingFeatureIds = ['recent', 'recentlyordered']
