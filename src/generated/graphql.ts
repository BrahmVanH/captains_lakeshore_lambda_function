import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Amenity = {
  __typename?: 'Amenity';
  _id: Scalars['ID']['output'];
  amenityName: Scalars['String']['output'];
  amenityType: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
};

export type AmenityInput = {
  amenityName: Scalars['String']['input'];
  amenityType: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user: User;
};

export type Bed = {
  __typename?: 'Bed';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type BedInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  dateValue: Scalars['String']['output'];
  propertyId: Scalars['ID']['output'];
};

export type CreateBookingInput = {
  bookings?: InputMaybe<Array<NewBookingInput>>;
};

export type CreatePropertyInput = {
  propertyName: Scalars['String']['input'];
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteS3ObjectInput = {
  imgKeys: Array<Scalars['String']['input']>;
};

export type DeleteS3ObjectResponse = {
  __typename?: 'DeleteS3ObjectResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type HouseRules = {
  __typename?: 'HouseRules';
  additional?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  children?: Maybe<Scalars['String']['output']>;
  damages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  events?: Maybe<Scalars['String']['output']>;
  general?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pets?: Maybe<Scalars['String']['output']>;
  smoking?: Maybe<Scalars['String']['output']>;
};

export type HouseRulesInput = {
  additional?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  children?: InputMaybe<Scalars['String']['input']>;
  damages?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  events?: InputMaybe<Scalars['String']['input']>;
  general?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pets?: InputMaybe<Scalars['String']['input']>;
  smoking?: InputMaybe<Scalars['String']['input']>;
};

export type Image = {
  __typename?: 'Image';
  alt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAmenity: Amenity;
  createBooking: Array<Maybe<Booking>>;
  createProperty: Property;
  createSeedAmenities: Array<Amenity>;
  createSeedSpaces: Array<Space>;
  createSpace: Space;
  createUser: Auth;
  deleteS3Objects: DeleteS3ObjectResponse;
  loginUser: Auth;
  removeAmenity: Amenity;
  removeBooking: RemoveBookingResponse;
  removeProperty: Property;
  removeSpace: Space;
  removeUser: Auth;
  updateAmenity: Amenity;
  updatePropertyAmenities: Property;
  updatePropertyDescription: Property;
  updatePropertyHeaderImg: Property;
  updatePropertyHouseRules: Property;
  updatePropertyImportantInfo: Property;
  updatePropertyInfo: Property;
  updatePropertyName: Property;
  updatePropertyOverviewItems: Property;
  updatePropertyRoomsAndBeds: Property;
  updatePropertySpaces: Property;
  updateSpace: Space;
};


export type MutationCreateAmenityArgs = {
  input: AmenityInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};


export type MutationCreateSpaceArgs = {
  input: SpaceInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteS3ObjectsArgs = {
  input: DeleteS3ObjectInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRemoveAmenityArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationRemoveBookingArgs = {
  input: RemoveBookingInput;
};


export type MutationRemovePropertyArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationRemoveSpaceArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput;
};


export type MutationUpdateAmenityArgs = {
  _id: Scalars['ID']['input'];
  input: AmenityInput;
};


export type MutationUpdatePropertyAmenitiesArgs = {
  input: UpdatePropertyAmenitiesInput;
};


export type MutationUpdatePropertyDescriptionArgs = {
  input: UpdatePropertyDescriptionInput;
};


export type MutationUpdatePropertyHeaderImgArgs = {
  input: UpdatePropertyHeaderImgInput;
};


export type MutationUpdatePropertyHouseRulesArgs = {
  input: UpdatePropertyHouseRulesInput;
};


export type MutationUpdatePropertyImportantInfoArgs = {
  input: UpdatePropertyImportantInfoInput;
};


export type MutationUpdatePropertyInfoArgs = {
  input: UpdatePropertyInput;
};


export type MutationUpdatePropertyNameArgs = {
  input: UpdatePropertyNameInput;
};


export type MutationUpdatePropertyOverviewItemsArgs = {
  input: UpdatePropertyOverviewItemsInput;
};


export type MutationUpdatePropertyRoomsAndBedsArgs = {
  input: UpdatePropertyRoomsAndBedsInput;
};


export type MutationUpdatePropertySpacesArgs = {
  input: UpdatePropertySpacesInput;
};


export type MutationUpdateSpaceArgs = {
  _id: Scalars['ID']['input'];
  input: SpaceInput;
};

export type NewBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
};

export type OverviewInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type OverviewItem = {
  __typename?: 'OverviewItem';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Property = {
  __typename?: 'Property';
  _id: Scalars['ID']['output'];
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  bookings?: Maybe<Array<Booking>>;
  headerImgKey?: Maybe<Scalars['String']['output']>;
  houseRules?: Maybe<HouseRules>;
  importantInfo?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  overviewItems?: Maybe<Array<Maybe<OverviewItem>>>;
  propertyDescription?: Maybe<Scalars['String']['output']>;
  propertyName: Scalars['String']['output'];
  roomsAndBeds?: Maybe<Array<Maybe<RoomBed>>>;
  spacesItems?: Maybe<Array<Maybe<Space>>>;
};

export type PropertyLite = {
  __typename?: 'PropertyLite';
  _id: Scalars['ID']['output'];
  headerImgKey: Scalars['String']['output'];
  propertyDescription: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg: Scalars['String']['output'];
  getAllUsers?: Maybe<Array<User>>;
  getAmenities: Array<Amenity>;
  getCottageImgs: CottageImgPack;
  getHideawayImgs: HideawayImgPack;
  getHomePgImgs: HomePgImgPack;
  getImg: Image;
  getImgs: Array<Image>;
  getProperties: Array<Property>;
  getPropertiesLite?: Maybe<Array<Maybe<PropertyLite>>>;
  getPropertyById: Property;
  getPropertyInfo: Property;
  getSpaces: Array<Space>;
  queryBookingsByProperty?: Maybe<Array<Booking>>;
};


export type QueryGetImgArgs = {
  imgKey: Scalars['String']['input'];
};


export type QueryGetImgsArgs = {
  imgKeys: Array<Scalars['String']['input']>;
};


export type QueryGetPropertyByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetPropertyInfoArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryQueryBookingsByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveBookingInput = {
  bookingIds: Array<Scalars['ID']['input']>;
};

export type RemoveBookingResponse = {
  __typename?: 'RemoveBookingResponse';
  deletedCount: Scalars['Int']['output'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RoomBed = {
  __typename?: 'RoomBed';
  beds?: Maybe<Array<Maybe<Bed>>>;
  name: Scalars['String']['output'];
};

export type RoomBedInput = {
  beds?: InputMaybe<Array<InputMaybe<BedInput>>>;
  name: Scalars['String']['input'];
};

export type Space = {
  __typename?: 'Space';
  _id: Scalars['ID']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type SpaceInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Update = {
  amenities?: InputMaybe<Array<AmenityInput>>;
  headerImgKey: Scalars['String']['input'];
  propertyDescription: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type UpdatePropertyAmenitiesInput = {
  _id: Scalars['ID']['input'];
  amenities?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdatePropertyDescriptionInput = {
  _id: Scalars['ID']['input'];
  propertyDescription: Scalars['String']['input'];
};

export type UpdatePropertyHeaderImgInput = {
  _id: Scalars['ID']['input'];
  headerImgKey: Scalars['String']['input'];
};

export type UpdatePropertyHouseRulesInput = {
  _id: Scalars['ID']['input'];
  houseRules?: InputMaybe<HouseRulesInput>;
};

export type UpdatePropertyImportantInfoInput = {
  _id: Scalars['ID']['input'];
  importantInfo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdatePropertyInput = {
  _id: Scalars['ID']['input'];
  update: Update;
};

export type UpdatePropertyNameInput = {
  _id: Scalars['ID']['input'];
  propertyName: Scalars['String']['input'];
};

export type UpdatePropertyOverviewItemsInput = {
  _id: Scalars['ID']['input'];
  overviewItems?: InputMaybe<Array<OverviewInput>>;
};

export type UpdatePropertyRoomsAndBedsInput = {
  _id: Scalars['ID']['input'];
  roomsAndBeds?: InputMaybe<Array<InputMaybe<RoomBedInput>>>;
};

export type UpdatePropertySpacesInput = {
  _id: Scalars['ID']['input'];
  spacesItems?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CottageImgPack = {
  __typename?: 'cottageImgPack';
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl: Scalars['String']['output'];
  headerImgUrl: Scalars['String']['output'];
  hideawayImgUrl: Scalars['String']['output'];
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Amenity: ResolverTypeWrapper<Amenity>;
  AmenityInput: AmenityInput;
  Auth: ResolverTypeWrapper<Auth>;
  Bed: ResolverTypeWrapper<Bed>;
  BedInput: BedInput;
  Booking: ResolverTypeWrapper<Booking>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBookingInput: CreateBookingInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: ResolverTypeWrapper<DeleteS3ObjectResponse>;
  HouseRules: ResolverTypeWrapper<HouseRules>;
  HouseRulesInput: HouseRulesInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewBookingInput: NewBookingInput;
  OverviewInput: OverviewInput;
  OverviewItem: ResolverTypeWrapper<OverviewItem>;
  Property: ResolverTypeWrapper<Property>;
  PropertyLite: ResolverTypeWrapper<PropertyLite>;
  Query: ResolverTypeWrapper<{}>;
  RemoveBookingInput: RemoveBookingInput;
  RemoveBookingResponse: ResolverTypeWrapper<RemoveBookingResponse>;
  RemoveUserInput: RemoveUserInput;
  RoomBed: ResolverTypeWrapper<RoomBed>;
  RoomBedInput: RoomBedInput;
  Space: ResolverTypeWrapper<Space>;
  SpaceInput: SpaceInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Update: Update;
  UpdatePropertyAmenitiesInput: UpdatePropertyAmenitiesInput;
  UpdatePropertyDescriptionInput: UpdatePropertyDescriptionInput;
  UpdatePropertyHeaderImgInput: UpdatePropertyHeaderImgInput;
  UpdatePropertyHouseRulesInput: UpdatePropertyHouseRulesInput;
  UpdatePropertyImportantInfoInput: UpdatePropertyImportantInfoInput;
  UpdatePropertyInput: UpdatePropertyInput;
  UpdatePropertyNameInput: UpdatePropertyNameInput;
  UpdatePropertyOverviewItemsInput: UpdatePropertyOverviewItemsInput;
  UpdatePropertyRoomsAndBedsInput: UpdatePropertyRoomsAndBedsInput;
  UpdatePropertySpacesInput: UpdatePropertySpacesInput;
  User: ResolverTypeWrapper<User>;
  cottageImgPack: ResolverTypeWrapper<CottageImgPack>;
  hideawayImgPack: ResolverTypeWrapper<HideawayImgPack>;
  homePgImgPack: ResolverTypeWrapper<HomePgImgPack>;
  imageObject: ResolverTypeWrapper<ImageObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amenity: Amenity;
  AmenityInput: AmenityInput;
  Auth: Auth;
  Bed: Bed;
  BedInput: BedInput;
  Booking: Booking;
  Boolean: Scalars['Boolean']['output'];
  CreateBookingInput: CreateBookingInput;
  CreatePropertyInput: CreatePropertyInput;
  CreateUserInput: CreateUserInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: DeleteS3ObjectResponse;
  HouseRules: HouseRules;
  HouseRulesInput: HouseRulesInput;
  ID: Scalars['ID']['output'];
  Image: Image;
  Int: Scalars['Int']['output'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  NewBookingInput: NewBookingInput;
  OverviewInput: OverviewInput;
  OverviewItem: OverviewItem;
  Property: Property;
  PropertyLite: PropertyLite;
  Query: {};
  RemoveBookingInput: RemoveBookingInput;
  RemoveBookingResponse: RemoveBookingResponse;
  RemoveUserInput: RemoveUserInput;
  RoomBed: RoomBed;
  RoomBedInput: RoomBedInput;
  Space: Space;
  SpaceInput: SpaceInput;
  String: Scalars['String']['output'];
  Update: Update;
  UpdatePropertyAmenitiesInput: UpdatePropertyAmenitiesInput;
  UpdatePropertyDescriptionInput: UpdatePropertyDescriptionInput;
  UpdatePropertyHeaderImgInput: UpdatePropertyHeaderImgInput;
  UpdatePropertyHouseRulesInput: UpdatePropertyHouseRulesInput;
  UpdatePropertyImportantInfoInput: UpdatePropertyImportantInfoInput;
  UpdatePropertyInput: UpdatePropertyInput;
  UpdatePropertyNameInput: UpdatePropertyNameInput;
  UpdatePropertyOverviewItemsInput: UpdatePropertyOverviewItemsInput;
  UpdatePropertyRoomsAndBedsInput: UpdatePropertyRoomsAndBedsInput;
  UpdatePropertySpacesInput: UpdatePropertySpacesInput;
  User: User;
  cottageImgPack: CottageImgPack;
  hideawayImgPack: HideawayImgPack;
  homePgImgPack: HomePgImgPack;
  imageObject: ImageObject;
};

export type AmenityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Amenity'] = ResolversParentTypes['Amenity']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amenityName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amenityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bed'] = ResolversParentTypes['Bed']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dateValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteS3ObjectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteS3ObjectResponse'] = ResolversParentTypes['DeleteS3ObjectResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HouseRulesResolvers<ContextType = any, ParentType extends ResolversParentTypes['HouseRules'] = ResolversParentTypes['HouseRules']> = {
  additional?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  children?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  damages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  events?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  general?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  pets?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smoking?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAmenity?: Resolver<ResolversTypes['Amenity'], ParentType, ContextType, RequireFields<MutationCreateAmenityArgs, 'input'>>;
  createBooking?: Resolver<Array<Maybe<ResolversTypes['Booking']>>, ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'input'>>;
  createProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationCreatePropertyArgs, 'input'>>;
  createSeedAmenities?: Resolver<Array<ResolversTypes['Amenity']>, ParentType, ContextType>;
  createSeedSpaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  createSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationCreateSpaceArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteS3Objects?: Resolver<ResolversTypes['DeleteS3ObjectResponse'], ParentType, ContextType, RequireFields<MutationDeleteS3ObjectsArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  removeAmenity?: Resolver<ResolversTypes['Amenity'], ParentType, ContextType, RequireFields<MutationRemoveAmenityArgs, '_id'>>;
  removeBooking?: Resolver<ResolversTypes['RemoveBookingResponse'], ParentType, ContextType, RequireFields<MutationRemoveBookingArgs, 'input'>>;
  removeProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationRemovePropertyArgs, '_id'>>;
  removeSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationRemoveSpaceArgs, '_id'>>;
  removeUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'input'>>;
  updateAmenity?: Resolver<ResolversTypes['Amenity'], ParentType, ContextType, RequireFields<MutationUpdateAmenityArgs, '_id' | 'input'>>;
  updatePropertyAmenities?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyAmenitiesArgs, 'input'>>;
  updatePropertyDescription?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyDescriptionArgs, 'input'>>;
  updatePropertyHeaderImg?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyHeaderImgArgs, 'input'>>;
  updatePropertyHouseRules?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyHouseRulesArgs, 'input'>>;
  updatePropertyImportantInfo?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyImportantInfoArgs, 'input'>>;
  updatePropertyInfo?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyInfoArgs, 'input'>>;
  updatePropertyName?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyNameArgs, 'input'>>;
  updatePropertyOverviewItems?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyOverviewItemsArgs, 'input'>>;
  updatePropertyRoomsAndBeds?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyRoomsAndBedsArgs, 'input'>>;
  updatePropertySpaces?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertySpacesArgs, 'input'>>;
  updateSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSpaceArgs, '_id' | 'input'>>;
};

export type OverviewItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OverviewItem'] = ResolversParentTypes['OverviewItem']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amenities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Amenity']>>>, ParentType, ContextType>;
  bookings?: Resolver<Maybe<Array<ResolversTypes['Booking']>>, ParentType, ContextType>;
  headerImgKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  houseRules?: Resolver<Maybe<ResolversTypes['HouseRules']>, ParentType, ContextType>;
  importantInfo?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  overviewItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['OverviewItem']>>>, ParentType, ContextType>;
  propertyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomsAndBeds?: Resolver<Maybe<Array<Maybe<ResolversTypes['RoomBed']>>>, ParentType, ContextType>;
  spacesItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['Space']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyLiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['PropertyLite'] = ResolversParentTypes['PropertyLite']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  headerImgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAboutPgImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  getAmenities?: Resolver<Array<ResolversTypes['Amenity']>, ParentType, ContextType>;
  getCottageImgs?: Resolver<ResolversTypes['cottageImgPack'], ParentType, ContextType>;
  getHideawayImgs?: Resolver<ResolversTypes['hideawayImgPack'], ParentType, ContextType>;
  getHomePgImgs?: Resolver<ResolversTypes['homePgImgPack'], ParentType, ContextType>;
  getImg?: Resolver<ResolversTypes['Image'], ParentType, ContextType, RequireFields<QueryGetImgArgs, 'imgKey'>>;
  getImgs?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<QueryGetImgsArgs, 'imgKeys'>>;
  getProperties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  getPropertiesLite?: Resolver<Maybe<Array<Maybe<ResolversTypes['PropertyLite']>>>, ParentType, ContextType>;
  getPropertyById?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<QueryGetPropertyByIdArgs, '_id'>>;
  getPropertyInfo?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<QueryGetPropertyInfoArgs, '_id'>>;
  getSpaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  queryBookingsByProperty?: Resolver<Maybe<Array<ResolversTypes['Booking']>>, ParentType, ContextType, RequireFields<QueryQueryBookingsByPropertyArgs, 'propertyId'>>;
};

export type RemoveBookingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveBookingResponse'] = ResolversParentTypes['RemoveBookingResponse']> = {
  deletedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomBedResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomBed'] = ResolversParentTypes['RoomBed']> = {
  beds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bed']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CottageImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['cottageImgPack'] = ResolversParentTypes['cottageImgPack']> = {
  galleryArray?: Resolver<Array<ResolversTypes['imageObject']>, ParentType, ContextType>;
  headerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HideawayImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['hideawayImgPack'] = ResolversParentTypes['hideawayImgPack']> = {
  galleryArray?: Resolver<Array<ResolversTypes['imageObject']>, ParentType, ContextType>;
  headerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePgImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['homePgImgPack'] = ResolversParentTypes['homePgImgPack']> = {
  cottageImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headerImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hideawayImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['imageObject'] = ResolversParentTypes['imageObject']> = {
  imgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Amenity?: AmenityResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  Bed?: BedResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  DeleteS3ObjectResponse?: DeleteS3ObjectResponseResolvers<ContextType>;
  HouseRules?: HouseRulesResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OverviewItem?: OverviewItemResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  PropertyLite?: PropertyLiteResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveBookingResponse?: RemoveBookingResponseResolvers<ContextType>;
  RoomBed?: RoomBedResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  cottageImgPack?: CottageImgPackResolvers<ContextType>;
  hideawayImgPack?: HideawayImgPackResolvers<ContextType>;
  homePgImgPack?: HomePgImgPackResolvers<ContextType>;
  imageObject?: ImageObjectResolvers<ContextType>;
};

