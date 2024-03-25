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

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  dateValue: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking?: Maybe<Booking>;
  createUser?: Maybe<Auth>;
  loginUser?: Maybe<Auth>;
  removeBooking?: Maybe<Booking>;
  removeUser?: Maybe<Auth>;
};


export type MutationCreateBookingArgs = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveBookingArgs = {
  dateValue: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg?: Maybe<Scalars['String']['output']>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCottageImgs?: Maybe<CottageImgPack>;
  getHideawayImgs?: Maybe<HideawayImgPack>;
  getHomePgImgs?: Maybe<HomePgImgPack>;
  queryBookingsByProperty?: Maybe<Array<Maybe<Booking>>>;
};


export type QueryQueryBookingsByPropertyArgs = {
  propertyName: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CottageImgPack = {
  __typename?: 'cottageImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray?: Maybe<Array<Maybe<ImageObject>>>;
  headerUrl?: Maybe<Scalars['String']['output']>;
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl?: Maybe<Scalars['String']['output']>;
  headerImgUrl?: Maybe<Scalars['String']['output']>;
  hideawayImgUrl?: Maybe<Scalars['String']['output']>;
};

export type ImageObject = {
  __typename?: 'imageObject';
  original?: Maybe<Scalars['String']['output']>;
  originalAlt?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailAlt?: Maybe<Scalars['String']['output']>;
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
  Auth: ResolverTypeWrapper<Auth>;
  Booking: ResolverTypeWrapper<Booking>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  cottageImgPack: ResolverTypeWrapper<CottageImgPack>;
  hideawayImgPack: ResolverTypeWrapper<HideawayImgPack>;
  homePgImgPack: ResolverTypeWrapper<HomePgImgPack>;
  imageObject: ResolverTypeWrapper<ImageObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Booking: Booking;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  cottageImgPack: CottageImgPack;
  hideawayImgPack: HideawayImgPack;
  homePgImgPack: HomePgImgPack;
  imageObject: ImageObject;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dateValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBooking?: Resolver<Maybe<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'dateValue' | 'propertyName'>>;
  createUser?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'adminCode' | 'firstName' | 'lastName' | 'userPassword' | 'username'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'userPassword' | 'username'>>;
  removeBooking?: Resolver<Maybe<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<MutationRemoveBookingArgs, 'dateValue' | 'propertyName'>>;
  removeUser?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'userPassword' | 'username'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAboutPgImg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getCottageImgs?: Resolver<Maybe<ResolversTypes['cottageImgPack']>, ParentType, ContextType>;
  getHideawayImgs?: Resolver<Maybe<ResolversTypes['hideawayImgPack']>, ParentType, ContextType>;
  getHomePgImgs?: Resolver<Maybe<ResolversTypes['homePgImgPack']>, ParentType, ContextType>;
  queryBookingsByProperty?: Resolver<Maybe<Array<Maybe<ResolversTypes['Booking']>>>, ParentType, ContextType, RequireFields<QueryQueryBookingsByPropertyArgs, 'propertyName'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CottageImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['cottageImgPack'] = ResolversParentTypes['cottageImgPack']> = {
  galleryArray?: Resolver<Maybe<Array<Maybe<ResolversTypes['imageObject']>>>, ParentType, ContextType>;
  headerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HideawayImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['hideawayImgPack'] = ResolversParentTypes['hideawayImgPack']> = {
  galleryArray?: Resolver<Maybe<Array<Maybe<ResolversTypes['imageObject']>>>, ParentType, ContextType>;
  headerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePgImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['homePgImgPack'] = ResolversParentTypes['homePgImgPack']> = {
  cottageImgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  headerImgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hideawayImgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['imageObject'] = ResolversParentTypes['imageObject']> = {
  original?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalAlt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnailAlt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  cottageImgPack?: CottageImgPackResolvers<ContextType>;
  hideawayImgPack?: HideawayImgPackResolvers<ContextType>;
  homePgImgPack?: HomePgImgPackResolvers<ContextType>;
  imageObject?: ImageObjectResolvers<ContextType>;
};

