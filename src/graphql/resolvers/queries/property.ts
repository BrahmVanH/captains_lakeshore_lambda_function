import { Property } from '@/models';
import { connectToDb } from '@/connection/db';
import {
  Image,
  ImageObject,
  Property as IProperty,
  QueryResolvers,
} from '@/generated/graphql';
import { getS3ImagesByDirectoryPrefix } from '@/utils/s3Query';


export const propertyQueries: QueryResolvers = {

  getPropertyInfo: async (_: {}, { _id }: { _id: string }, __: any) => {
    try {
      await connectToDb();

      if (!_id) {
        throw new Error('No ID was presented for querying property info');
      }

      const propertyInfo: IProperty | null = await Property.findOne({ _id }).populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');

      if (!propertyInfo) {
        throw new Error('Could not find property with that name');
      }

      return propertyInfo;
    } catch (err: any) {
      console.error('Error in getting property info', err);
      throw new Error('Error in getting property info: ' + err.message);
    }
  },
  getProperties: async () => {
    try {
      await connectToDb();

      const properties: IProperty[] = await Property.find().populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');

      if (!properties) {
        throw new Error('Error fetching all properties from database');
      }

      return properties;
    } catch (err: any) {
      console.error({ message: 'error in finding properties', details: err });
      throw new Error('Error in finding properties: ' + err.message);
    }
  },
  getPropertiesLite: async () => {
    try {
      await connectToDb();

      const properties: IProperty[] = await Property.find();

      if (!properties) {
        throw new Error('Error fetching all properties from database');
      }

      return properties.map(({ _id, propertyName, propertyDescription, headerImgKey }) => ({
        _id,
        propertyName,
        propertyDescription: propertyDescription ?? '',
        headerImgKey: headerImgKey ?? '',
      }));
    } catch (err: any) {
      console.error({ message: 'error in finding properties', details: err });
      throw new Error('Error in finding properties: ' + err.message);
    }
  },
  getPropertyById: async (_: {}, { _id }: { _id: string }, __: any) => {
    try {
      await connectToDb();
      if (!_id) {
        throw new Error('No ID was presented for querying property');
      }
      const property: IProperty | null = await Property.findOne({ _id }).populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');
      if (!property) {
        throw new Error('Could not find property with that name');
      }
      return property;
    } catch (err: any) {
      console.error('Error in getting property info', err);
      throw new Error('Error in getting property info: ' + err.message);
    }
  },
  getPropertyImgs: async (_: {}, { _id }: { _id: string }, __: any) => {
    try {
      await connectToDb();
      if (!_id) {
        console.error("No id parameter present in getPropertyImgs");
        throw new Error('Invalid ID');
      }
      const property: IProperty | null = await Property.findOne({ _id });

      if (!property) {
        console.error("Could not find property with that name")
        throw new Error('Could not find property with that name');
      }

      const { s3DirectoryPrefix } = property;

      if (!s3DirectoryPrefix) {
        return [] as Image[]
      }

      const images = await getS3ImagesByDirectoryPrefix(s3DirectoryPrefix)

      return images

    } catch (err: any) {
      console.error('Error in getting property info', err);
      throw new Error('Error in getting property info: ' + err.message);
    }
  }
}