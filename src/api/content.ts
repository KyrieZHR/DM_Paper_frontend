import request from './request'

export function getCompanyInfo() { return request.get('/website/company') }
export function getMilestones() { return request.get('/website/milestones') }
export function getValues() { return request.get('/website/values') }
export function getTeam() { return request.get('/website/team') }
export function getProducts() { return request.get('/website/products') }
export function getProduction() { return request.get('/website/production') }
export function getGreen() { return request.get('/website/green') }
export function getTechnology() { return request.get('/website/technology') }
export function getQuality() { return request.get('/website/quality') }
export function getNews() { return request.get('/website/news') }
export function getJobs() { return request.get('/website/jobs') }
