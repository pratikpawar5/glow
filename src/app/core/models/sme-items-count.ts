export class GloqrAdminItemsCount {
    activePendingCertificates: number;
    activePendingInfras: number;
    activePendingTeams: number;
    activePendingGalleries: number;
    activePendingVacancies: number;
    activePendingProducts: number;
    activePendingServices: number;
    activePendingBusinessPosts: number;
}

export class ViewModeItemsCount {
    activeApprovedCertificates: number;
    activeApprovedInfras: number;
    activeApprovedTeams: number;
    activeApprovedGalleries: number;
    activeApprovedVacancies: number;
    activeApprovedProducts: number;
    activeApprovedServices: number;
    activeApprovedBusinessPosts: number;
}

export class EditModeItemsCount {
    totalCertificates: number = 0;
    totalInfras: number = 0;
    totalTeams: number = 0;
    totalGalleries: number = 0;
    totalVacancies: number = 0;
    totalProducts: number = 0;
    totalServices: number = 0;
    totalBusinessPosts: number = 0;
}
export class ItemsCount{
    totalCertificates: number = 0;
    totalInfras: number = 0;
    totalTeams: number = 0;
    totalGalleries: number = 0;
    totalVacancies: number = 0;
    totalProducts: number = 0;
    totalServices: number = 0;
    totalBusinessPosts: number = 0;

    activeApprovedCertificates: number;
    activeApprovedInfras: number;
    activeApprovedTeams: number;
    activeApprovedGalleries: number;
    activeApprovedVacancies: number;
    activeApprovedProducts: number;
    activeApprovedServices: number;
    activeApprovedBusinessPosts: number;

    activePendingCertificates: number;
    activePendingInfras: number;
    activePendingTeams: number;
    activePendingGalleries: number;
    activePendingVacancies: number;
    activePendingProducts: number;
    activePendingServices: number;
    activePendingBusinessPosts: number;

}
export class EditModeItemsPercentage {
    productPercentage: DoubleRange;

    servicePercentage:  DoubleRange;

    certificatePercentage: DoubleRange;

    infraPercentage: DoubleRange;

    galleryPercentage: DoubleRange;

    teamPercentage: DoubleRange;

    jobsPercentage: DoubleRange;

    socialPostPercentage: DoubleRange;

    overAllPercentage:DoubleRange
}