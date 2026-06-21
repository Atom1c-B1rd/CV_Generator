export interface CvData {
    // Personal
    nombre: string
    rol: string
    email: string
    telefono: string
    ubicacion: string
    linkedin: string
    sobre_mi: string

    // Experiencia
    experiencia: {
        empresa: string
        puesto: string
        desde: string
        hasta: string
        descripcion: string
    }[]

    // Educacion
    educacion: {
        institucion: string
        titulo: string
        anio: string
    }[]

    // Skills
    skills: string[]

    // Idiomas
    idiomas: {
        idioma: string
        nivel: string
    }[]
}

const defaultCvData = (): CvData => ({
    nombre: '',
    rol: '',
    email: '',
    telefono: '',
    ubicacion: '',
    linkedin: '',
    sobre_mi: '',
    experiencia: [{ empresa: '', puesto: '', desde: '', hasta: '', descripcion: '' }],
    educacion: [{ institucion: '', titulo: '', anio: '' }],
    skills: [''],
    idiomas: [{ idioma: '', nivel: 'nativo' }]
})

const cvData = reactive<CvData>(defaultCvData())
const plantillaSeleccionada = ref<'clasica' | 'moderna' | 'minimalista' |'ats'| null>(null)

export const useCvData = () => {
    const resetCv = () => Object.assign(cvData, defaultCvData())

    return {
        cvData,
        plantillaSeleccionada,
        resetCv
    }
}