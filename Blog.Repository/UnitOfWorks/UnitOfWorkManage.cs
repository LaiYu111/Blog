﻿using Microsoft.Extensions.Logging;
using SqlSugar;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository.UnitOfWorks
{
    public class UnitOfWorkManage : IUnitOfWorkManage
    {
        private readonly ILogger<UnitOfWorkManage> _logger;
        private readonly ISqlSugarClient _sqlSugarClient;

        private int _tranCount { get; set; }
        public int TranCount => _tranCount;
        public readonly ConcurrentStack<string> TranStack = new();

        public UnitOfWorkManage(ISqlSugarClient sqlSugarClient, ILogger<UnitOfWorkManage> logger)
        {
            _sqlSugarClient = sqlSugarClient;
            _logger = logger;
            _tranCount = 0;
        }
        public UnitOfWork CreateUnitOfWork()
        {
            UnitOfWork uow = new UnitOfWork();
            uow.Logger = _logger;
            uow.Db = _sqlSugarClient;
            uow.Tenant = (ITenant)_sqlSugarClient;
            uow.IsTran = true;

            uow.Db.Open();
            uow.Tenant.BeginTran();
            _logger.LogDebug("UnitOfWork Begin");
            return uow;
        }

        /// <summary>
        /// 获取DB，保证唯一性
        /// </summary>
        /// <returns></returns>
        public SqlSugarScope GetDbClient()
        {
            // 必须要as，后边会用到切换数据库操作
            return _sqlSugarClient as SqlSugarScope;
        }

        public void BeginTran()
        {
            lock (this)
            {
                _tranCount++;
                GetDbClient().BeginTran();
            }
        }
        public void CommitTran()
        {
            lock (this)
            {
                _tranCount--;
                if (_tranCount == 0)
                {
                    try
                    {
                        GetDbClient().CommitTran();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        GetDbClient().RollbackTran();
                    }
                }
            }
        }

        public void RollbackTran()
        {
            lock (this)
            {
                _tranCount--;
                GetDbClient().RollbackTran();
            }
        }
    }
}