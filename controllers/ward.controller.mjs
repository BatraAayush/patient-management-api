import mongoose from 'mongoose'
import {Ward} from '../models/ward.model.mjs'

const getAllWards = async () => {
  try {
    const wards = await Ward.find()

    return wards
  } catch (error) {
    throw error
  }
}

const addWard = async (wardData) => {
  try {
    const ward = new Ward(wardData)
    const addedWard = await ward.save()

    return addedWard
  } catch (error) {
    throw error
  }
}

const updateWard = async (wardId, wardData) => {
  try {
    const ward = await Ward.findByIdAndUpdate(wardId, wardData, {
      new: true
    })

    return ward
  } catch (error) {
    throw error
  }
}

const deleteWard = async (wardId) => {
  try {
    const ward = await Ward.findByIdAndDelete(wardId)

    return ward
  } catch (error) {
    throw error
  }
}

export { getAllWards, addWard, updateWard, deleteWard }