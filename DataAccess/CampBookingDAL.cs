﻿using AutoMapper;
using DataAccess.DatabaseModels;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class CampBookingDAL
    {
        CampBookingContext db = new CampBookingContext();
        MapperConfiguration config;
        IMapper iMapper;

        //Constructor
        public CampBookingDAL()
        {
            config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CampEntity, CampDTO>();
                cfg.CreateMap<CampDTO, CampEntity>();

                cfg.CreateMap<UserEntity, UserDTO>();
                cfg.CreateMap<UserDTO, UserEntity>();

                cfg.CreateMap<BookingDTO, BookingEntity>();
                cfg.CreateMap<BookingEntity, BookingDTO>();
            });

            iMapper = config.CreateMapper();
        }

        // Get all Camps
        public List<CampDTO> GetAllCampsDB()
        {
            IQueryable<CampEntity> allCampsEntity;
            List<CampDTO> allCampsDTO = new List<CampDTO>();
            try
            {
                allCampsEntity = from c in db.Camps
                                 select c;
                allCampsEntity.ToList().ForEach(c => allCampsDTO.Add( iMapper.Map<CampEntity, CampDTO> (c) ));
                return allCampsDTO;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        // Post new Camp
        public void PostNewCampDB(CampDTO campDTO)
        {
            try
            {
                CampEntity campEntity = iMapper.Map<CampDTO, CampEntity>(campDTO);
                db.Camps.Add(campEntity);
                db.SaveChanges();

            }
            catch(Exception e)
            {
                throw e;
            }
        }

    }
}